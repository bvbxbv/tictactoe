import { CellState } from "@configs/enums";

export class Board {
	#board;

	constructor() {
		this.#board = Array(9).fill(CellState.Empty);
	}

	get cells() {
		return [...this.#board];
	}

	get freeCells() {
		return [...this.#board]
			.map((el, i) => (el === CellState.Empty ? i : -1))
			.filter((i) => i !== -1);
	}

	setCell(value, index) {
		this.#board[index] = value;
	}

	cellIs(value, index) {
		return this.#board[index] === value;
	}

	reset() {
		this.#board.fill(CellState.Empty);
	}

	serialize() {
		return {
			cells: this.#board,
		};
	}
}
