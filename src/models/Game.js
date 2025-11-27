// FIXME: разнести этот класс. Перерефакторить. В общем больше не должно существовать такой штуки как класс Game.
import { PlayerMark, CellState } from "@configs/enums";
import { GameDrawEvent, GameStartEvent, GameWinEvent } from "@core/events/GameEvents";
import { PlayerChangedEvent } from "@core/events/PlayerEvents";
import { logAction } from "@utils/helpers.js";
import { ok, err } from "@utils/helpers.js";

export class Game {
	#dispatcher;
	#board;
	#score;
	#store;
	#currentPlayer = PlayerMark.Cross;
	#isGameEnded = false;
	#winnerCombo = null;
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

	constructor(dispatcher, board, score, store) {
		this.#dispatcher = dispatcher;
		this.#score = score;
		this.#board = board;
		this.#dispatcher.subscribe(GameStartEvent, this.onGameStartHandler.bind(this));
		this.#store = store;
	}

	onGameStartHandler() {
		if (this.#store.state.player !== null && this.#store.state.player !== undefined) {
			this.#currentPlayer = this.#store.state.player.activePlayerMark;
		}
	}

	get winnerCombo() {
		return this.#winnerCombo;
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

	checkComboMatches() {
		return Game.combos.find(([a, b, c]) => {
			const cell = this.#board.cells[a];
			return (
				cell !== CellState.Empty &&
				cell === this.#board.cells[b] &&
				cell === this.#board.cells[c]
			);
		});
	}

	checkWinner() {
		const winningCombo = this.checkComboMatches();

		if (winningCombo) {
			const winner = this.#board.cells[winningCombo[0]];
			this.#winnerCombo = winningCombo[0];

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

	increaseScore(winner) {
		this.#score.win(winner);
	}

	#togglePlayer() {
		this.#currentPlayer =
			this.#currentPlayer === PlayerMark.Cross ? PlayerMark.Zero : PlayerMark.Cross;

		logAction(this, PlayerChangedEvent, this.#currentPlayer);
		this.#dispatcher.dispatch(new PlayerChangedEvent(this.#currentPlayer));
	}

	reset() {
		this.#board.reset();
		this.#isGameEnded = false;
		this.#currentPlayer = PlayerMark.Cross;
		// this.#dispatcher.dispatch(new GameStartEvent());
	}
}
