import { CellState, PlayerMark } from "@configs/enums";
import { EventDispatcher } from "@core/events/Base/EventDispatcher";
import { CellChangedEvent } from "@core/events/BoardEvents";
import { Board } from "@models/Board";
import { beforeEach, describe, test, vi } from "../../node_modules/vitest/dist/index";
import { expect } from "../../node_modules/vitest/dist/index";

let board;
beforeEach(() => {
	const dispatcher = new EventDispatcher();
	dispatcher.subscribe(CellChangedEvent, vi.fn());
	board = new Board(dispatcher);
});

describe("Board -> setCell", () => {
	test("Board.setCell должна менять содержимое ячейки", () => {
		board.setCell(PlayerMark.Cross, 0);
		expect(board.cells[0]).toStrictEqual(PlayerMark.Cross);
	});

	test("При повторном вызове Board.setCell должна менять содержимое ячейки", () => {
		board.setCell(PlayerMark.Cross, 0);
		expect(board.cells[0]).toStrictEqual(PlayerMark.Cross);
		board.setCell(PlayerMark.Zero, 0);
		expect(board.cells[0]).toStrictEqual(PlayerMark.Zero);
	});
});

describe("Board -> cellIs", () => {
	test("cellIs должен вернуть true, если элементы совпадают", () => {
		const res = board.cellIs(CellState.Empty, 0);
		expect(res).toBe(true);
	});

	test("cellIs должен вернуть false, если элементы не совпадают", () => {
		const res = board.cellIs(CellState.Cross, 0);
		expect(res).toBe(false);
	});
});

describe("Board -> reset", () => {
	test("reset должен очистить Board.cells", () => {
		board.setCell(CellState.Cross, 0);
		board.setCell(CellState.Cross, 1);
		board.setCell(CellState.Cross, 2);
		board.setCell(CellState.Cross, 3);
		expect(board.cells).not.toStrictEqual(Array(9).fill(CellState.Empty));
		board.reset();
		expect(board.cells).toStrictEqual(Array(9).fill(CellState.Empty));
	});
});

describe("Board -> serialize", () => {
	test("serialize должен вернуть содержимое в виде объекта", () => {
		expect(board.serialize()).toStrictEqual(
			expect.objectContaining({
				cells: Array(9).fill(CellState.Empty),
			}),
		);

		board.setCell(CellState.Cross, 0);
		const expected = Array(9).fill(CellState.Empty);
		expected[0] = CellState.Cross;
		expect(board.serialize()).toStrictEqual(
			expect.objectContaining({
				cells: expected,
			}),
		);
	});

	test("serialize должен вернуть содержимое как ссылку на объект", () => {
		const empty = {
			cells: Array(9).fill(CellState.Empty),
		};
		expect(board.serialize()).toStrictEqual(expect.objectContaining(empty));

		const objLink = board.serialize();
		objLink.cells[0] = "hack";
		expect(board.serialize()).not.toStrictEqual(expect.objectContaining(empty));
	});
});

describe("Board -> cells", () => {
	test("cells должен вернуть содержимое в виде массива", () => {
		let expected = Array(9).fill(CellState.Empty);
		expect(board.cells).toStrictEqual(expected);

		board.setCell(CellState.Cross, 0);
		expect(board.cells).not.toStrictEqual(expected);
	});

	test("cells возвращает копию массива, а не ссылку", () => {
		expect(board.cells).toStrictEqual(Array(9).fill(CellState.Empty));

		const toChange = board.cells;
		toChange[0] = "hack";

		expect(board.cells).toStrictEqual(Array(9).fill(CellState.Empty));

		const expectedCopy = Array(9).fill(CellState.Empty);
		expectedCopy[0] = "hack";
		expect(toChange).toStrictEqual(expectedCopy);
	});
});
