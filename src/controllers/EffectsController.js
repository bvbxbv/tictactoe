import { GameWinEvent } from "../core/events/GameEvents";
import { EffectsView } from "../ui/views/EffectsView";
import fanfareUrl from "../assets/fanfare.wav";
import { logHandler } from "../utils/helpers";

class EffectsController {
	#view;
	#dispatcher;

	constructor({ dispatcher }) {
		this.#dispatcher = dispatcher;
		this.#view = new EffectsView({ audio: fanfareUrl });
		this.#subscribe();
	}

	#subscribe() {
		this.#dispatcher.subscribe(GameWinEvent, this.onGameWinHandler.bind(this));
	}

	onGameWinHandler() {
		logHandler(this, GameWinEvent, this.onGameWinHandler);
		this.#view.update();
	}
}

let instance = null;
export function getEffectsController({ dispatcher }) {
	if (instance === null) {
		instance = new EffectsController({ dispatcher: dispatcher });
	}
	return instance;
}
