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
		update: vi.fn(),
	};
	controller = new EffectsController({
		view: view,
		dispatcher: dispatcher,
	});
});

describe("EffectsController.events", () => {
	beforeEach(() => {
		controller.boot();
	});

	test("Подписка на GameWinEvent и вызов view.update при триггере", () => {
		dispatcher.dispatch(new GameWinEvent("", []));
		expect(view.update).toHaveBeenCalled();
	});
});
