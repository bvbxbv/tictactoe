import { CellState, PlayerMark } from "@configs/enums";
import { EventDispatcher } from "@core/events/Base/EventDispatcher";
import { CellChangedEvent } from "@core/events/BoardEvents";
import { GameDrawEvent, GameWinEvent } from "@core/events/GameEvents";
import { ScoreChangedEvent } from "@core/events/ScoreEvents";
import { Board } from "@models/Board";
import { Game } from "@models/Game";
import { Score } from "@models/Score";
import { beforeEach, describe, expect, test, vi } from "../../node_modules/vitest/dist/index";

let game, dispatcher, score;
const outOfRangeResponse = {
	ok: false,
	value: null,
	error: {
		code: "INDEX_OUT_OF_RANGE",
		message: "Индекс вне диапазона",
	},
};

const cellOccupiedResponse = {
	ok: false,
	value: null,
	error: {
		code: "CELL_OCCUPIED",
		message: "Клетка уже занята",
	},
};

beforeEach(() => {
	dispatcher = new EventDispatcher();
	dispatcher.subscribe(ScoreChangedEvent, vi.fn());
	dispatcher.subscribe(CellChangedEvent, vi.fn());

	score = new Score(dispatcher);
	const board = new Board(dispatcher);
	game = new Game(dispatcher, board, score);
});

describe("Game.makeMove", () => {
	let spy;
	beforeEach(() => {
		spy = vi.spyOn(game, "makeMove");
	});

	test("makeMove -> поведение при незанятой ячейке", () => {
		const expected = {
			ok: true,
			value: "X",
		};
		let res = game.makeMove(0);
		expect(res).toStrictEqual(expected);
		expect(spy).toHaveReturnedWith(expected);
	});

	test("makeMove -> поведение при уже занятой ячейке", () => {
		let res = game.makeMove(0);
		res = game.makeMove(0);
		expect(res).toStrictEqual(cellOccupiedResponse);
		expect(spy).toHaveReturnedWith(cellOccupiedResponse);
	});

	test("makeMove -> индекс вне диапазона", () => {
		dispatcher.subscribe(GameWinEvent, vi.fn());
		[...Array(9).keys()].forEach((index) => {
			const prev = game.whoseMove;
			let res = game.makeMove(index);
			expect(res).toStrictEqual({
				ok: true,
				value: prev,
			});
			expect(game.board.cells[index]).toBe(prev);
		});

		[-228, -9, 9, 226].forEach((index) => {
			let res = game.makeMove(index);
			expect(res).toStrictEqual(outOfRangeResponse);
			expect(spy).toHaveReturnedWith(outOfRangeResponse);
		});
	});

	test("makeMove -> setCell", () => {
		const prev = game.whoseMove;
		game.makeMove(0);
		expect(game.board.cells[0]).toBe(prev);

		game.makeMove(0);
		expect(game.board.cells[0]).toBe(prev);
	});
});

describe("Game.checkWinner", () => {
	test("checkWinner -> win", () => {
		const onWin = vi.fn();
		dispatcher.subscribe(GameWinEvent, onWin);
		const combos = [
			[0, 1, 2],
			[3, 4, 5],
			[6, 7, 8],
			[0, 3, 6],
			[1, 4, 7],
			[2, 5, 8],
			[0, 4, 8],
			[2, 4, 6],
		];

		combos.forEach((combo) => {
			game.board.reset();
			combo.forEach((i) => {
				game.board.setCell(PlayerMark.Cross, i);
			});
			game.checkWinner();
		});
		expect(onWin).toHaveBeenCalledTimes(combos.length);
	});

	test("checkWinner триггерит ScoreChangeEvent", () => {
		const handler = vi.fn();
		dispatcher.subscribe(ScoreChangedEvent, handler);
		dispatcher.subscribe(GameWinEvent, vi.fn());
		dispatcher.subscribe(GameDrawEvent, vi.fn());
		[0, 1, 2].forEach((index) => {
			game.board.setCell(PlayerMark.Cross, index);
		});
		game.checkWinner();
		expect(handler).toHaveBeenCalled();
	});

	test("checkWinner -> draw", () => {
		const drawBoards = [
			["X", "O", "X", "X", "O", "O", "O", "X", "X"],
			["O", "X", "O", "O", "X", "X", "X", "O", "O"],
			["X", "X", "O", "O", "O", "X", "X", "O", "X"],
			["O", "X", "X", "X", "O", "O", "X", "O", "X"],
			["X", "O", "X", "O", "X", "O", "O", "X", "O"],
		];

		const onWin = vi.fn();
		const onDraw = vi.fn();
		dispatcher.subscribe(GameWinEvent, onWin);
		dispatcher.subscribe(GameDrawEvent, onDraw);

		drawBoards.forEach((board) => {
			game.board.reset();
			board.forEach((cell, index) => {
				game.board.setCell(cell, index);
			});
			game.checkWinner();
		});

		expect(onWin).not.toHaveBeenCalled();
		expect(onDraw).toHaveBeenCalledTimes(drawBoards.length);
	});
});

describe("Game.togglePlayer", () => {
	test("makeMove -> togglePlayer (без повтора индексов)", () => {
		game.makeMove(0);
		expect(game.board.cells[0]).toBe(PlayerMark.Cross);

		game.makeMove(1);
		expect(game.board.cells[1]).toBe(PlayerMark.Zero);
	});

	test("makeMove -> togglePlayer (с повтором индексов)", () => {
		game.makeMove(0);
		expect(game.board.cells[0]).toBe(PlayerMark.Cross);

		game.makeMove(0);
		expect(game.board.cells[0]).toBe(PlayerMark.Cross);

		game.makeMove(1);
		expect(game.board.cells[1]).toBe(PlayerMark.Zero);
	});

	test("whoseMove всегда PlayerMark.Cross после Game.reset", () => {
		game.makeMove(0); // X
		game.reset();
		expect(game.whoseMove).toStrictEqual(PlayerMark.Cross);

		game.makeMove(0); // X
		game.makeMove(0); // 0
		game.makeMove(0); // X
		game.reset();
		expect(game.whoseMove).toStrictEqual(PlayerMark.Cross);
	});
});

describe("Game.reset", () => {
	test("Game.board.cells должен быть массивом с элементами равными CellState.Empty", () => {
		const cleanBoard = [...Array(9).fill(CellState.Empty).values()];
		game.makeMove(0);
		game.makeMove(1);
		game.makeMove(3);
		expect(game.board.cells).not.toStrictEqual(cleanBoard);
		game.reset();
		expect(game.board.cells).toStrictEqual(cleanBoard);
	});
});
