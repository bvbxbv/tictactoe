import { CellState } from "@configs/enums";
import { CellChangedEvent } from "@core/events/BoardEvents";

export class Board {
	#board;
	#dispatcher;

	constructor(dispatcher, board = Array(9).fill(CellState.Empty)) {
		this.#dispatcher = dispatcher;
		this.#board = board;
	}

	get cells() {
		return [...this.#board];
	}

	get freeCells() {
		return [...this.#board]
			.map((el, i) => (el === CellState.Empty ? i : -1))
			.filter((i) => i !== -1);
	}

	get busyCells() {
		return [...this.#board]
			.map((el, i) => (el !== CellState.Empty ? i : -1))
			.filter((i) => i !== -1);
	}

	// TODO: тесты
	movesOf(player) {
		return this.#board.map((cell, i) => (cell === player ? i : -1)).filter((i) => i !== -1);
	}

	setCell(value, index) {
		this.#board[index] = value;
		this.#dispatcher.dispatch(new CellChangedEvent());
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
