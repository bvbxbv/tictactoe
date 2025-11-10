// FIXME: перенести gameState в отдельный файл.
import { cellState } from "./Game";

export const gameState = Object.freeze({
	win: "win",
	draw: "draw",
	playing: "playing",
});

export class Board {
	#board;

	constructor() {
		this.#board = Array(9).fill(cellState.Empty);
	}

	get cells() {
		return [...this.#board];
	}

	setCell(value, index) {
		this.#board[index] = value;
	}

	cellIs(value, index) {
		return this.#board[index] === value;
	}

	reset() {
		this.#board.fill(cellState.Empty);
	}
}
