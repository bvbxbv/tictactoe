// @ts-check
/// <reference types="vitest" />
import { BoardController } from "@controllers/BoardController";
import { EventDispatcher } from "@core/events/Base/EventDispatcher";
import { BoardResetEvent, BoardUpdatedEvent } from "@core/events/BoardEvents";
import { PlayerMovedEvent } from "@core/events/PlayerEvents";
import { beforeEach, describe, expect, test, vi } from "../../node_modules/vitest/dist/index";
import { createGameMock } from "../mocks/Game.mock";
let gameManager, dispatcher, view, controller;

beforeEach(() => {
	gameManager = createGameMock();
	dispatcher = new EventDispatcher();
	view = {
		update: vi.fn(),
	};
	controller = new BoardController({
		gameManager: gameManager,
		dispatcher: dispatcher,
		board: gameManager.board,
		view: view,
	});
	controller.boot();
});

describe("Подписка на события", () => {
	beforeEach(() => {
		controller.cellClickHandler = vi.fn();
		controller.boardUpdatedHandler = vi.fn();
		controller.boardResetHandler = vi.fn();

		controller.boot();
	});

	test("PlayerMovedEvent", () => {
		dispatcher.dispatch(new PlayerMovedEvent(0));
		expect(controller.cellClickHandler).toHaveBeenCalledWith(
			expect.objectContaining({ detail: { index: 0 } }),
		);
	});

	test("BoardUpdatedEvent", () => {
		const toPass = gameManager.board.serialize().cells;
		dispatcher.dispatch(new BoardUpdatedEvent(toPass));
		expect(controller.boardUpdatedHandler).toHaveBeenCalledWith(
			expect.objectContaining({
				detail: {
					board: toPass,
				},
			}),
		);
	});

	test("BoardResetEvent", () => {
		dispatcher.dispatch(new BoardResetEvent());
		expect(controller.boardResetHandler).toHaveBeenCalled();
	});
});

describe("Поведение при триггере событий", () => {
	test("BoardResetEvent", () => {
		dispatcher.dispatch(new BoardResetEvent());
		expect(gameManager.reset).toHaveBeenCalled();
	});
});

describe("BoardController.handleCellClick", () => {
	test("handleCellClick должен вернуть исключение если 0 > index или 9 < index", () => {
		expect(() => controller.handleCellClick(-1)).toThrowError(/Index/);
		expect(() => controller.handleCellClick(0)).not.toThrowError(/Index/);
		expect(() => controller.handleCellClick(8)).not.toThrowError(/Index/);
		expect(() => controller.handleCellClick(10)).toThrowError(/Index/);
	});

	test("Должен вызвать gameManager.makeMove при клике", () => {
		controller.handleCellClick(2);
		expect(gameManager.makeMove).toHaveBeenCalledWith(2);
	});

	test("handleCellClick должен задиспатчить событие PlayerMovedEvent", () => {
		const spy = vi.spyOn(dispatcher, "dispatch");
		controller.handleCellClick(2);
		expect(spy).toHaveBeenCalledWith(expect.any(PlayerMovedEvent));
	});

	test("Не должен вызывать view.update при некорректном вводе", () => {
		gameManager.makeMove.mockReturnValue({ ok: false });
		controller.handleCellClick(2);
		expect(view.update).not.toHaveBeenCalled();
	});

	test("Должен обновлять view после корректного входа", () => {
		const spy = vi.spyOn(dispatcher, "dispatch");
		controller.handleCellClick(1);
		expect(view.update).toHaveBeenCalled();
		expect(spy).toHaveBeenCalledWith(expect.any(BoardUpdatedEvent));
	});
});
