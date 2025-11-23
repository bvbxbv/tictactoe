// FIXME: Factory

import { appConfigs } from "@configs/appConfigs";
import { CellState, PlayerMark } from "@configs/enums";
import { BoardUpdatedEvent } from "@core/events/BoardEvents";
import { GameDrawEvent, GameLooseEvent, GameWinEvent } from "@core/events/GameEvents";
import { PlayerMovedEvent } from "@core/events/PlayerEvents";
import { Pipeline } from "@core/pipeline/Pipeline";
import { Game } from "@models/Game";
import { DefensiveMovePipe } from "@pipes/DefensiveMovePipe";
import { DummyMovePipe } from "@pipes/DummyMovePipe";
import { TryingToForkPipe } from "@pipes/TryingToForkPipe";
import { WinningMovePipe } from "@pipes/WinningMovePipe";
import { getRandomItem } from "@utils/helpers";
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
		this.#dispatcher.subscribe(GameWinEvent, this.gameWinHandler.bind(this));
		this.#dispatcher.subscribe(GameDrawEvent, this.gameDrawHandler.bind(this));
		this.#dispatcher.subscribe(GameLooseEvent, this.gameLooseHandler.bind(this));
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
		this.#showToast(response.message);
		this.#dispatcher.dispatch(new BoardUpdatedEvent(this.#gameManager.board.serialize()));
	}

	gameWinHandler(e) {
		// TODO: игрок должен выбирать сторону
		if (e.detail.winnner === PlayerMark.Cross) {
			this.#showToast(getRandomItem(appConfigs.AI.messages.loose));
		}
	}

	gameDrawHandler() {
		this.#showToast(getRandomItem(appConfigs.AI.messages.draw));
	}

	gameLooseHandler(e) {
		// TODO: игрок должен выбирать сторону
		if (e.detail.looser === PlayerMark.Cross) {
			this.#showToast(getRandomItem(appConfigs.AI.messages.timer.win));
		}
	}

	#showToast(phrase) {
		Toastify({
			text: phrase.message,
			className: phrase.className,
			duration: 1500,
		}).showToast();
	}
}
