// @ts-check
/// <reference types="vitest" />
import { ScoreController } from "@controllers/ScoreController";
import { EventDispatcher } from "@core/events/Base/EventDispatcher";
import { BoardResetEvent } from "@core/events/BoardEvents";
import { PlayerMovedEvent } from "@core/events/PlayerEvents";
import { beforeEach, describe, expect, test, vi } from "../../node_modules/vitest/dist/index";
import { createGameMock } from "../mocks/Game.mock";
let gameManager, dispatcher, view, controller;

beforeEach(() => {
	gameManager = createGameMock();
	dispatcher = new EventDispatcher();
	view = {
		update: vi.fn(() => {}),
	};
	controller = new ScoreController({
		gameManager: gameManager,
		view: view,
		dispatcher: dispatcher,
	});
	controller.boot();
});

describe("Подписка на события", () => {
	beforeEach(() => {
		controller.updateScore = vi.fn();
		dispatcher.subscribe(PlayerMovedEvent, controller.updateScore);
		dispatcher.subscribe(BoardResetEvent, controller.updateScore);
	});

	test("PlayerMovedEvent", () => {
		dispatcher.dispatch(new PlayerMovedEvent(0));
		expect(controller.updateScore).toHaveBeenCalled();
	});
	test("BoardResetEvent", () => {
		dispatcher.dispatch(new BoardResetEvent());
		expect(controller.updateScore).toHaveBeenCalled();
	});
});

describe("Поведение при триггере событий", () => {
	test("Должен обновлять счет при PlayerMovedEvent", () => {
		dispatcher.dispatch(new PlayerMovedEvent(0));
		expect(view.update).toHaveBeenCalledWith(
			expect.objectContaining({
				activePlayerMark: "X",
			}),
		);
	});

	test("Должен обновлять счет при BoardResetEvent", () => {
		dispatcher.dispatch(new BoardResetEvent());
		expect(view.update).toHaveBeenCalledWith(
			expect.objectContaining({
				activePlayerMark: "X",
			}),
		);
	});
});
