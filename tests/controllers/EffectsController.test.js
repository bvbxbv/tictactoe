// @ts-check
/// <reference types="vitest" />
import { appConfigs } from "@configs/appConfigs";
import { EffectsController } from "@controllers/EffectsController";
import { EventDispatcher } from "@core/events/Base/EventDispatcher";
import { GameWinEvent } from "@core/events/GameEvents";
import { getRandomItem } from "@utils/helpers";
import { beforeEach, describe, expect, test, vi } from "../../node_modules/vitest/dist/index";
let dispatcher, view, controller;

beforeEach(() => {
	dispatcher = new EventDispatcher();
	view = {
		showMessageInChat: vi.fn(),
		showWinScreen: vi.fn(),
	};

	controller = new EffectsController({
		view: view,
		gameManager: {},
		dispatcher: dispatcher,
		store: {
			state: {
				aiName: getRandomItem(appConfigs.AI.nicknames),
			},
		},
	});
	controller.boot();
});

describe("Подписка на события", () => {
	beforeEach(() => {
		controller.onGameWinHandler = vi.fn();
		controller.boot();
	});

	test("GameWinEvent", () => {
		dispatcher.dispatch(new GameWinEvent("", []));
		expect(controller.onGameWinHandler).toHaveBeenCalled();
	});
});

describe("Поведение при триггере событий", () => {
	test("GameWinEvent -> EffectsController.onGameWinHandler", () => {
		dispatcher.dispatch(new GameWinEvent("", []));
		expect(view.showWinScreen).toHaveBeenCalled();
	});
});
