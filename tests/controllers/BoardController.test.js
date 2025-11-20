// @ts-check
/// <reference types="vitest" />
import { BoardController } from "@controllers/BoardController";
import { EventDispatcher } from "@core/events/Base/EventDispatcher";
import { BoardResetEvent, BoardUpdatedEvent } from "@core/events/BoardEvents";
import { PlayerMovedEvent } from "@core/events/PlayerEvents";
import { beforeEach, describe, expect, test, vi } from "../../node_modules/vitest/dist/index";
let gameManager, dispatcher, view, controller;

beforeEach(() => {
	gameManager = {
		board: {
			cells: ["", "", "", "", "", "", "", "", ""],
			serialize() {
				return this.cells;
			},
		},
		reset: vi.fn(),
		makeMove: vi.fn(() => ({ ok: true })),
	};
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
});

describe("BoardController.handleCellClick", () => {
	test("handleCellClick должен вернуть исключение если 0 > index или 9 < index", () => {
		controller.boot();

		expect(() => controller.handleCellClick(-1)).toThrowError(/Index/);
		expect(() => controller.handleCellClick(0)).not.toThrowError(/Index/);
		expect(() => controller.handleCellClick(8)).not.toThrowError(/Index/);
		expect(() => controller.handleCellClick(10)).toThrowError(/Index/);
	});

	test("Должен вызвать gameManager.makeMove при клике", () => {
		controller.boot();
		controller.handleCellClick(2);
		expect(gameManager.makeMove).toHaveBeenCalledWith(2);
	});

	test("handleCellClick должен задиспатчить событие PlayerMovedEvent", () => {
		controller.boot();
		const spy = vi.spyOn(dispatcher, "dispatch");
		controller.handleCellClick(2);
		expect(spy).toHaveBeenCalledWith(expect.any(PlayerMovedEvent));
	});

	test("Не должен вызывать view.update при некорректном вводе", () => {
		gameManager.makeMove.mockReturnValue({ ok: false });
		controller.boot();
		controller.handleCellClick(2);
		expect(view.update).not.toHaveBeenCalled();
	});

	test("Должен обновлять view после корректного входа", () => {
		controller.boot();
		const spy = vi.spyOn(dispatcher, "dispatch");
		controller.handleCellClick(1);
		expect(view.update).toHaveBeenCalled();
		expect(spy).toHaveBeenCalledWith(expect.any(BoardUpdatedEvent));
	});
});
describe("BoardController.events", () => {
	test("BoardResetEvent должен триггерить boardResetHandler", () => {
		const spy = vi.spyOn(controller, "boardResetHandler");
		controller.boot();
		dispatcher.dispatch(new BoardResetEvent());
		expect(spy).toHaveBeenCalled();
	});
	test("BoardResetEvent триггерит reset-логику в контроллере", () => {
		controller.boot();
		dispatcher.dispatch(new BoardResetEvent());
		expect(gameManager.reset).toHaveBeenCalled();
	});
});
