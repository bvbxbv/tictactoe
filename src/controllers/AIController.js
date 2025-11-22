// FIXME: Factory

import { CellState, PlayerMark } from "@configs/enums";
import { BoardUpdatedEvent } from "@core/events/BoardEvents";
import { PlayerMovedEvent } from "@core/events/PlayerEvents";
import { Pipeline } from "@core/pipeline/Pipeline";
import { Game } from "@models/Game";
import { DefensiveMovePipe } from "@pipes/DefensiveMovePipe";
import { DummyMovePipe } from "@pipes/DummyMovePipe";
import { TryingToForkPipe } from "@pipes/TryingToForkPipe";
import { WinningMovePipe } from "@pipes/WinningMovePipe";
import Toastify from "toastify-js";

// FIXME: DIs
export class AIController {
	#gameManager;
	#dispatcher;

	constructor(gameManager, dispatcher) {
		this.#gameManager = gameManager;
		this.#dispatcher = dispatcher;
	}

	boot() {
		this.#subscribe();
	}

	#subscribe() {
		this.#dispatcher.subscribe(PlayerMovedEvent, this.handleMove.bind(this));
	}

	handleMove() {
		if (!this.#gameManager.isAiMove || this.#gameManager.isGameEnded) {
			return;
		}

		const pipeline = new Pipeline([
			WinningMovePipe,
			DefensiveMovePipe,
			TryingToForkPipe,
			DummyMovePipe,
		]);

		const response = pipeline
			.passThrough({
				_mark: PlayerMark.Zero,
				_combos: Game.combos,
				_isEmpty: this.#gameManager.board.cells.every((c) => c === CellState.Empty),
				_freeIndexes: this.#gameManager.board.freeCells,
				_busyIndexes: this.#gameManager.board.busyCells,
				_crossIndexes: this.#gameManager.board.movesOf(PlayerMark.Cross),
				_zeroIndexes: this.#gameManager.board.movesOf(PlayerMark.Zero),
			})
			.run(this.#gameManager.board.cells);
		this.#gameManager.makeMove(response.index);
		Toastify({
			text: response.message,
			duration: 1500,
		}).showToast();
		this.#dispatcher.dispatch(new BoardUpdatedEvent(this.#gameManager.board.serialize()));
	}
}
