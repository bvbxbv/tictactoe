import { dispatcher } from "../core/events/Base/EventDispatcher";
import { PlayerMovedEvent } from "../core/events/PlayerEvents";
import { ScoreView } from "../ui/views/ScoreView";
import { UI } from "../ui/elements";
import { log } from "../utils/consolawrapper";
import { BoardResetEvent } from "../core/events/BoardEvents";
import { logAction, logHandler } from "../utils/helpers";

class ScoreController {
	#view;
	#gameManager;

	constructor(gameManager) {
		this.#gameManager = gameManager;
		this.#view = new ScoreView(UI.score.cross, UI.score.zero);
		this.#subscribe();
	}

	#subscribe() {
		dispatcher.subscribe(PlayerMovedEvent, this.updateScore.bind(this));
		dispatcher.subscribe(BoardResetEvent, this.updateScore.bind(this));
	}

	updateScore(e) {
		logHandler(this, e.constructor, this.updateScore);
		this.#view.update({ activePlayerMark: this.#gameManager.whoseMove });
	}
}

let instance = null;
export function getScoreController(gameManager) {
	if (!instance) {
		instance = new ScoreController(gameManager);
	}

	return instance;
}
