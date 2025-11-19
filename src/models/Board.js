// FIXME: сделать фабрики моделей и не создавать ничего в моделях, контроллерах. Нигде. Все зависимости передавать сверху вниз
import { CellState } from "@configs/enums";

export class Board {
	#board;

	constructor() {
		this.#board = Array(9).fill(CellState.Empty);
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
		this.#board.fill(CellState.Empty);
	}

	serialize() {
		return {
			cells: this.#board,
		};
	}
}
