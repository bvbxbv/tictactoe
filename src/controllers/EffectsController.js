import fanfareUrl from "@assets/fanfare.wav";
import { GameWinEvent } from "@core/events/GameEvents";
import { AIWantsToSpeakEvent } from "@core/events/PlayerEvents";
import { logHandler } from "@utils/helpers";

export class EffectsController {
	#view;
	#dispatcher;

	constructor({ view, dispatcher }) {
		this.#view = view;
		this.#dispatcher = dispatcher;
	}

	boot() {
		this.#subscribe();
	}

	#subscribe() {
		this.#dispatcher.subscribe(GameWinEvent, this.onGameWinHandler.bind(this));
		this.#dispatcher.subscribe(AIWantsToSpeakEvent, this.onAIWantsToSpeak.bind(this));
	}

	onGameWinHandler() {
		logHandler(this, GameWinEvent, this.onGameWinHandler);
		this.#view.update({ audioUrl: fanfareUrl });
	}

	onAIWantsToSpeak(e) {
		const text = e.detail.speach;
		const className = e.detail.className;
		this.#view.showToast({
			text: text,
			className: className,
			duration: 1500, // FIXME: config
		});
	}
}
