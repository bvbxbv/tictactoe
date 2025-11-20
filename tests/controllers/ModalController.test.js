// @ts-check
/// <reference types="vitest" />
import { ModalController } from "@controllers/ModalController";
import { EventDispatcher } from "@core/events/Base/EventDispatcher";
import { BoardResetEvent } from "@core/events/BoardEvents";
import {
	GameDrawEvent,
	GameLooseEvent,
	GameResetEvent,
	GameWinEvent,
} from "@core/events/GameEvents";
import { beforeEach, describe, expect, test, vi } from "../../node_modules/vitest/dist/index";
let gameManager, dispatcher, view, controller;

beforeEach(() => {
	gameManager = {
		board: {
			cells: ["", "", "", "", "", "", "", "", ""],
			serialize() {
				return {
					cells: this.cells,
				};
			},
		},
		reset: vi.fn(),
		makeMove: vi.fn(() => ({ ok: true })),
	};
	dispatcher = new EventDispatcher();
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
	test("GameWinEvent", () => {
		controller.onWinHandler = vi.fn();
		dispatcher.subscribe(GameWinEvent, controller.onWinHandler);
		dispatcher.dispatch(new GameWinEvent("X", [0, 1, 2]));
		expect(controller.onWinHandler).toHaveBeenCalled();
	});

	test("GameDrawEvent", () => {
		controller.onDrawHandler = vi.fn();
		dispatcher.subscribe(GameDrawEvent, controller.onDrawHandler);
		dispatcher.dispatch(new GameDrawEvent());
		expect(controller.onDrawHandler).toHaveBeenCalled();
	});

	test("GameResetEvent", () => {
		dispatcher.subscribe(BoardResetEvent, vi.fn());
		controller.onResetHandler = vi.fn();
		dispatcher.subscribe(GameResetEvent, controller.onResetHandler);
		dispatcher.dispatch(new GameResetEvent());
		expect(controller.onResetHandler).toHaveBeenCalled();
	});

	test("GameLooseEvent", () => {
		controller.onLooseHandler = vi.fn();
		dispatcher.subscribe(GameLooseEvent, controller.onLooseHandler);
		dispatcher.dispatch(new GameLooseEvent());
		expect(controller.onLooseHandler).toHaveBeenCalled();
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
		const resetFn = vi.fn();
		dispatcher.subscribe(BoardResetEvent, resetFn);

		dispatcher.dispatch(new GameResetEvent());
		expect(gameManager.reset).toHaveBeenCalled();
		expect(resetFn).toHaveBeenCalled();
	});

	test("GameLooseEvent -> onLooseHandler", () => {
		dispatcher.dispatch(new GameLooseEvent("X"));
		expect(view.update).toHaveBeenCalledWith(
			expect.objectContaining({
				message: "Игра окончена. Проигравший: X",
				board: gameManager.board.serialize().cells,
				winCombo: null,
			}),
		);
	});
});
