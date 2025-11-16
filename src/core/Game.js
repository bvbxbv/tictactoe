// FIXME: разнести этот класс. Перерефакторить. В общем больше не должно существовать такой штуки как класс Game.
// FIXME: вынести ok и err в отдельный файл. Чем я думал когда писал их в этом классе?
import { Board } from "./Board";
import { PlayerMark, CellState } from "../configs/enums";
import { dispatcher } from "./events/Base/EventDispatcher.js";
import { GameDrawEvent, GameWinEvent } from "./events/GameEvents";
import { logAction } from "../utils/helpers.js";

export class Game {
	#board = new Board();
	#currentPlayer = PlayerMark.Cross;
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
		if (!this.#board.cellIs(CellState.Empty, index)) {
			return Game.#err("CELL_OCCUPIED", "Клетка уже занята");
		}
		const current = this.#currentPlayer;
		this.#board.setCell(current, index);
		this.checkWinner();
		this.#togglePlayer();
		return Game.#ok(current);
	}

	checkWinner() {
		const winningCombo = Game.#combos.find(([a, b, c]) => {
			const cell = this.#board.cells[a];
			return (
				cell !== CellState.Empty &&
				cell === this.#board.cells[b] &&
				cell === this.#board.cells[c]
			);
		});

		if (winningCombo) {
			const winner = this.#board.cells[winningCombo[0]];
			logAction(this, GameWinEvent, { winner, winnerCombo: winningCombo });
			dispatcher.dispatch(new GameWinEvent(winner, winningCombo));
			return true;
		}

		if (this.#board.cells.every((cell) => cell !== CellState.Empty)) {
			logAction(this, GameDrawEvent);
			dispatcher.dispatch(new GameDrawEvent());
			return true;
		}

		return false;
	}

	#togglePlayer() {
		this.#currentPlayer =
			this.#currentPlayer === PlayerMark.Cross ? PlayerMark.Zero : PlayerMark.Cross;
	}

	reset() {
		this.#board.reset();
		this.#currentPlayer = PlayerMark.Cross;
	}
}
