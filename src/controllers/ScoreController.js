import { PlayerMovedEvent } from "../core/events/PlayerEvents";
import { ScoreView } from "../ui/views/ScoreView";
import { UI } from "../ui/elements";
import { BoardResetEvent } from "../core/events/BoardEvents";
import { logHandler } from "../utils/helpers";

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
		this.#dispatcher.subscribe(PlayerMovedEvent, this.updateScore.bind(this));
		this.#dispatcher.subscribe(BoardResetEvent, this.updateScore.bind(this));
	}

	updateScore(e) {
		logHandler(this, e.constructor, this.updateScore);
		this.#view.update({ activePlayerMark: this.#gameManager.whoseMove });
	}
}
