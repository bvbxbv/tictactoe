// FIXME: вынести ok и err в отдельный файл. Чем я думал когда писал их в этом классе?
// FIXME: вынести то, что внутри player в конфиги. Подумай над нэймингом.
import { Board, gameState } from "./Board";

export const player = Object.freeze({
	Cross: "X",
	Zero: "O",
});

export const cellState = Object.freeze({
	Empty: "",
	Cross: player.Cross,
	Zero: player.Zero,
});

export class Game {
	#board = new Board();
	#currentPlayer = player.Cross;
	static #combos = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	];

	static #ok = (v) => ({ ok: true, value: v });
	static #err = (code, message) => ({ ok: false, value: null, error: { code, message } });

	get whoseMove() {
		return this.#currentPlayer;
	}

	get board() {
		return this.#board;
	}

	makeMove(index) {
		if (!this.#board.cellIs(cellState.Empty, index)) {
			return Game.#err("CELL_OCCUPIED", "Клетка уже занята");
		}
		const current = this.#currentPlayer;
		this.#board.setCell(current, index);

		this.#togglePlayer();
		return Game.#ok(current);
	}

	checkWinner() {
		const winnerCombo = Game.#combos.find(([a, b, c]) => {
			const cell = this.#board.cells[a];
			return cell !== cellState.Empty && cell === this.#board.cells[b] && cell === this.#board.cells[c];
		});

		if (winnerCombo) {
			return {
				status: gameState.win,
				winner: this.#board.cells[winnerCombo[0]],
				combo: winnerCombo,
			};
		}

		if (this.#board.cells.every((cell) => cell !== cellState.Empty)) {
			return { status: gameState.draw };
		}

		return { status: gameState.playing };
	}

	#togglePlayer() {
		this.#currentPlayer = this.#currentPlayer === player.Cross ? player.Zero : player.Cross;
	}

	reset() {
		this.#board.reset();
		this.#currentPlayer = player.Cross;
	}
}
