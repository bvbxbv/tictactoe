// @ts-check
/// <reference types="vitest" />
import { EffectsController } from "@controllers/EffectsController";
import { EventDispatcher } from "@core/events/Base/EventDispatcher";
import { GameWinEvent } from "@core/events/GameEvents";
import { beforeEach, describe, expect, test, vi } from "../../node_modules/vitest/dist/index";
let dispatcher, view, controller;

beforeEach(() => {
	dispatcher = new EventDispatcher();
	view = {
		showWinScreen: vi.fn(),
	};
	controller = new EffectsController({
		view: view,
		gameManager: {},
		dispatcher: dispatcher,
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
