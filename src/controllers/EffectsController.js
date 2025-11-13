import { dispatcher } from "../core/events/Base/EventDispatcher";
import { GameWinEvent } from "../core/events/GameEvents";
import { EffectsView } from "../ui/views/EffectsView";
import fanfareUrl from "../assets/fanfare.wav";
import { logHandler } from "../utils/helpers";

class EffectsController {
	#view;

	constructor() {
		this.#view = new EffectsView({ audio: fanfareUrl });
		this.#subscribe();
	}

	#subscribe() {
		dispatcher.subscribe(GameWinEvent, this.onGameWinHandler.bind(this));
	}

	onGameWinHandler() {
		logHandler(this, GameWinEvent, this.onGameWinHandler);
		this.#view.update();
	}
}

let instance = null;
export function getEffectsController() {
	if (instance === null) {
		instance = new EffectsController();
	}
	return instance;
}
