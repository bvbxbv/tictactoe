import { vi } from "../../node_modules/vitest/dist/index";

export function createGameMock() {
	const board = {
		cells: Array(9).fill(""),
		freeCells: Array.from({ length: 9 }, (_, i) => i),
		busyCells: [],
		serialize() {
			return { cells: this.cells };
		},
		movesOf: vi.fn(() => []),
	};

	const makeMove = vi.fn(() => ({ ok: true }));
	const reset = vi.fn(() => {
		board.cells.fill("");
		board.freeCells = Array.from({ length: 9 }, (_, i) => i);
		board.busyCells = [];
	});

	return {
		board,
		makeMove,
		reset,
		get whoseMove() {
			return "X";
		},
		isAiMove: false,
		checkComboMatches: vi.fn(() => false),
		score: { set: vi.fn() },
	};
}
