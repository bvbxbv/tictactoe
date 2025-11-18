import { GameWinEvent } from "@core/events/GameEvents";
import { logHandler } from "@utils/helpers";

export class EffectsController {
	#view;
	#dispatcher;

	constructor({ view, dispatcher }) {
		this.#dispatcher = dispatcher;
		this.#view = view;
	}

	boot() {
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
