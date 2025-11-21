// FIXME: разнести этот класс. Перерефакторить. В общем больше не должно существовать такой штуки как класс Game.
// FIXME: вынести ok и err в отдельный файл. Чем я думал когда писал их в этом классе?
import { PlayerMark, CellState } from "@configs/enums";
import { GameDrawEvent, GameWinEvent } from "@core/events/GameEvents";
import { Board } from "@models/Board";
import { logAction } from "@utils/helpers.js";
import { ok, err } from "@utils/helpers.js";
import { Score } from "./Score";

export class Game {
	#dispatcher;
	#board = new Board();
	// FIXME: фабрика
	// FIXME: DI
	#score;
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

	constructor(dispatcher) {
		this.#dispatcher = dispatcher;
		this.#score = new Score(this.#dispatcher);
	}

	get whoseMove() {
		return this.#currentPlayer;
	}

	get board() {
		return this.#board;
	}

	get score() {
		return this.#score;
	}

	makeMove(index) {
		if (index < 0 || index > 8) {
			return err("INDEX_OUT_OF_RANGE", "Индекс вне диапазона");
		}

		if (!this.#board.cellIs(CellState.Empty, index)) {
			return err("CELL_OCCUPIED", "Клетка уже занята");
		}

		const current = this.#currentPlayer;
		this.#board.setCell(current, index);
		this.checkWinner();
		this.#togglePlayer();
		return ok(current);
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
			this.#score.win(winner);
			logAction(this, GameWinEvent, { winner, winnerCombo: winningCombo });
			this.#dispatcher.dispatch(new GameWinEvent(winner, winningCombo));
			return true;
		}

		if (this.#board.cells.every((cell) => cell !== CellState.Empty)) {
			logAction(this, GameDrawEvent);
			this.#dispatcher.dispatch(new GameDrawEvent());
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
