// FIXME: разнести этот класс. Перерефакторить. В общем больше не должно существовать такой штуки как класс Game.
import { PlayerMark, CellState } from "@configs/enums";
import { GameDrawEvent, GameWinEvent } from "@core/events/GameEvents";
import { logAction } from "@utils/helpers.js";
import { ok, err } from "@utils/helpers.js";

export class Game {
	#dispatcher;
	#board;
	#score;
	#currentPlayer = PlayerMark.Cross;
	#isGameEnded = false;
	static combos = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	];

	constructor(dispatcher, board, score) {
		this.#dispatcher = dispatcher;
		this.#score = score;
		this.#board = board;
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

	get isGameEnded() {
		return this.#isGameEnded;
	}

	// FIXME: переделать это, учитывая что игрок может быть не только cross.
	get isAiMove() {
		return this.whoseMove === PlayerMark.Zero;
	}

	surrend() {
		this.#score.loose(PlayerMark.Cross);
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
		const winningCombo = Game.combos.find(([a, b, c]) => {
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
			this.#isGameEnded = true;
			return true;
		}

		if (this.#board.cells.every((cell) => cell !== CellState.Empty)) {
			logAction(this, GameDrawEvent);
			this.#dispatcher.dispatch(new GameDrawEvent());
			this.#isGameEnded = true;
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
		this.#isGameEnded = false;
		this.#currentPlayer = PlayerMark.Cross;
	}
}
