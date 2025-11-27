import { BoardResetEvent } from "@core/events/BoardEvents";
import { GameStartEvent, GameSurrendEvent } from "@core/events/GameEvents";
import { AIMovedEvent, PlayerMovedEvent } from "@core/events/PlayerEvents";
import { ScoreChangedEvent } from "@core/events/ScoreEvents";
import { logHandler } from "@utils/helpers";

export class ScoreController {
	#view;
	#gameManager;
	#dispatcher;
	#store;

	constructor({ gameManager, view, dispatcher, store }) {
		this.#gameManager = gameManager;
		this.#dispatcher = dispatcher;
		this.#view = view;
		this.#store = store;
	}

	boot() {
		this.#subscribe();
	}

	#subscribe() {
		this.#dispatcher.subscribe(ScoreChangedEvent, this.updateScoreValues.bind(this));
		this.#dispatcher.subscribe(PlayerMovedEvent, this.updateWhoseMove.bind(this));
		this.#dispatcher.subscribe(AIMovedEvent, this.updateWhoseMove.bind(this));
		this.#dispatcher.subscribe(BoardResetEvent, this.updateWhoseMove.bind(this));
		this.#dispatcher.subscribe(GameSurrendEvent, this.updateScoreValues.bind(this));
		this.#dispatcher.subscribe(GameStartEvent, this.onGameStartHandler.bind(this));
	}

	onGameStartHandler() {
		if (
			this.#store.state.score !== null &&
			this.#store.state.score !== undefined &&
			this.#store.state.player !== undefined
		) {
			this.#view.update({
				activePlayerMark: this.#store.state.player.activePlayerMark,
				cross: this.#store.state.score.cross,
				zero: this.#store.state.score.zero,
			});
		}
	}

	updateWhoseMove(e) {
		logHandler(this, e.constructor, this.updateWhoseMove, e.detail);
		this.#view.update({ activePlayerMark: this.#gameManager.whoseMove });
	}

	updateScoreValues(e) {
		logHandler(this, ScoreChangedEvent, this.updateScoreValues, e.detail);
		this.#view.update({
			activePlayerMark: this.#gameManager.whoseMove,
			cross: e.detail.cross,
			zero: e.detail.zero,
		});
	}
}
