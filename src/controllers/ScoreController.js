import { BoardResetEvent } from "@core/events/BoardEvents";
import { PlayerMovedEvent } from "@core/events/PlayerEvents";
import { ScoreChangedEvent } from "@core/events/ScoreEvents";
import { logHandler } from "@utils/helpers";

export class ScoreController {
	#view;
	#gameManager;
	#dispatcher;

	constructor({ gameManager, view, dispatcher }) {
		this.#gameManager = gameManager;
		this.#dispatcher = dispatcher;
		this.#view = view;
	}

	boot() {
		this.#subscribe();
	}

	#subscribe() {
		this.#dispatcher.subscribe(ScoreChangedEvent, this.updateScoreValues.bind(this));
		this.#dispatcher.subscribe(PlayerMovedEvent, this.updateWhoseMove.bind(this));
		this.#dispatcher.subscribe(BoardResetEvent, this.updateWhoseMove.bind(this));
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
