// FIXME: добавить метод clear в EventDispatcher
vi.mock("../../src/core/events/Base/EventDispatcher.js", () => {
	const listeners = new Map();

	return {
		dispatcher: {
			subscribe(eventType, handler) {
				if (!listeners.has(eventType)) listeners.set(eventType, []);
				listeners.get(eventType).push(handler);
			},
			dispatch(event) {
				const handlers = listeners.get(event.constructor) || [];
				handlers.forEach((h) => h({ detail: event.detail }));
			},
			_clear() {
				listeners.clear();
			},
		},
	};
});

import { describe, expect, test, vi, beforeEach } from "vitest";
import { getDomFixture } from "../domFixture";
import { BoardController } from "../../src/controllers/BoardController";
import { PlayerMovedEvent } from "../../src/core/events/PlayerEvents.js";
import { dispatcher } from "../../src/core/events/Base/EventDispatcher.js";
import { BoardResetEvent } from "../../src/core/events/BoardEvents.js";

describe("BoardController", () => {
	let gameManager, view, board, controller;

	beforeEach(() => {
		dispatcher._clear();
		document.body.innerHTML = getDomFixture();

		board = ["", "", "", "", "", "", "", "", ""];
		gameManager = {
			makeMove: vi.fn(() => ({ ok: true })),
			board: {
				get cells() {
					return board;
				},
				serialize() {
					return { cells: board };
				},
				reset: vi.fn(),
			},
			reset: vi.fn(),
		};
		board = gameManager.board;
		view = {
			onCellClick: (index) => {
				dispatcher.dispatch(new PlayerMovedEvent(index));
			},
			update: vi.fn(),
		};

		controller = new BoardController({ gameManager, board, view });
		controller.boot();
	});

	test("Должен вызвать gameManager.makeMove при клике", () => {
		view.onCellClick(3);
		expect(gameManager.makeMove).toHaveBeenCalledWith(3);
	});

	test("Должен обновлять view после корректного входа", () => {
		view.onCellClick(3);
		expect(view.update).toHaveBeenCalled();
	});

	test("Не должен вызывать view.update при некорректном вводе", () => {
		gameManager.makeMove.mockReturnValueOnce({ ok: false });
		view.onCellClick(3);
		expect(view.update).not.toHaveBeenCalled();
	});

	test("Должен вызываться BoardController.boardResetHandler", () => {
		dispatcher.dispatch(new BoardResetEvent());
		expect(gameManager.reset).toHaveBeenCalled();
		expect(view.update).toHaveBeenCalled();
	});
});
