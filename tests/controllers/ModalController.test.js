// @ts-check
/// <reference types="vitest" />
import { ModalController } from "@controllers/ModalController";
import { EventDispatcher } from "@core/events/Base/EventDispatcher";
import { BoardResetEvent } from "@core/events/BoardEvents";
import { GameDrawEvent, GameResetEvent, GameWinEvent } from "@core/events/GameEvents";
import { beforeEach, describe, expect, test, vi } from "../../node_modules/vitest/dist/index";
import { createGameMock } from "../mocks/Game.mock";
let gameManager, dispatcher, view, controller, resetFn;

beforeEach(() => {
	gameManager = createGameMock();
	dispatcher = new EventDispatcher();
	resetFn = vi.fn();
	dispatcher.subscribe(BoardResetEvent, resetFn);

	view = {
		update: vi.fn(),
	};
	controller = new ModalController({
		gameManager: gameManager,
		view: view,
		dispatcher: dispatcher,
	});
	controller.boot();
});

describe("Подписка на события", () => {
	beforeEach(() => {
		controller.onWinHandler = vi.fn();
		controller.onDrawHandler = vi.fn();
		controller.onResetHandler = vi.fn();
		controller.onLooseHandler = vi.fn();

		controller.boot();
	});

	test("GameWinEvent", () => {
		dispatcher.dispatch(new GameWinEvent("", []));
		expect(controller.onWinHandler).toHaveBeenCalled();
	});

	test("GameDrawEvent", () => {
		dispatcher.dispatch(new GameDrawEvent());
		expect(controller.onDrawHandler).toHaveBeenCalled();
	});

	test("GameResetEvent", () => {
		dispatcher.dispatch(new GameResetEvent());
		expect(controller.onResetHandler).toHaveBeenCalled();
	});
});

describe("Поведение при триггере событий", () => {
	test("GameWinEvent -> onWinHandler", () => {
		dispatcher.dispatch(new GameWinEvent("X", [0, 1, 2]));
		expect(view.update).toHaveBeenCalledWith(
			expect.objectContaining({
				message: "Игра окончена. Победитель: X",
				board: gameManager.board.serialize().cells,
				winCombo: [0, 1, 2],
			}),
		);
	});

	test("GameDrawEvent -> onDrawHandler", () => {
		dispatcher.dispatch(new GameDrawEvent());
		expect(view.update).toHaveBeenCalledWith(
			expect.objectContaining({
				message: "Победила дружба!",
				board: gameManager.board.serialize().cells,
				winCombo: null,
			}),
		);
	});
	test("GameResetEvent -> onResetHandler", () => {
		dispatcher.dispatch(new GameResetEvent());
		expect(gameManager.reset).toHaveBeenCalled();
		expect(resetFn).toHaveBeenCalled();
	});
});
