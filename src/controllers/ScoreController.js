import { PlayerMovedEvent } from "../core/events/PlayerEvents";
import { ScoreView } from "../ui/views/ScoreView";
import { UI } from "../ui/elements";
import { BoardResetEvent } from "../core/events/BoardEvents";
import { logHandler } from "../utils/helpers";

class ScoreController {
	#view;
	#gameManager;
	#dispatcher;

	constructor({ gameManager, dispatcher }) {
		this.#gameManager = gameManager;
		this.#dispatcher = dispatcher;
		this.#view = new ScoreView(UI.score.cross, UI.score.zero);
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

let instance = null;
export function getScoreController({ gameManager, dispatcher }) {
	if (!instance) {
		instance = new ScoreController({ gameManager: gameManager, dispatcher: dispatcher });
	}

	return instance;
}
