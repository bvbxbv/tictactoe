import { appConfigs } from "@configs/appConfigs";
import { GameRestartEvent, GameStartEvent, GameWinEvent } from "@core/events/GameEvents";
import { AIWantsToSpeakEvent } from "@core/events/PlayerEvents";
import { getRandomItem } from "@utils/helpers";

export class ChatController {
	#gameManager;
	#view;
	#dispatcher;
	#store;

	constructor(gameManager, dispatcher, view, store) {
		this.#dispatcher = dispatcher;
		this.#gameManager = gameManager;
		this.#view = view;
		this.#store = store;
	}

	boot() {
		this.#subscribe();
	}

	#subscribe() {
		this.#dispatcher.subscribe(GameStartEvent, this.fillChat.bind(this));
		this.#dispatcher.subscribe(GameWinEvent, this.onGameWinHandler.bind(this));
		this.#dispatcher.subscribe(AIWantsToSpeakEvent, this.appendMessage.bind(this));
		this.#dispatcher.subscribe(GameRestartEvent, this.resetChat.bind(this));
	}

	resetChat() {
		this.#view.renderChat([]);
	}

	onGameWinHandler() {
		if (!this.#gameManager.isAiMove) {
			const phrase = getRandomItem(appConfigs.AI.messages.loose);
			this.#dispatcher.dispatch(
				new AIWantsToSpeakEvent(phrase.message, phrase.className, phrase.chance),
			);
		}
	}

	fillChat() {
		if (this.#store.state.chat !== null && this.#store.state.chat !== undefined) {
			this.#view.renderChat(this.#store.state.chat);
		}
	}

	appendMessage(e) {
		const phrase = {};
		if (e.detail.speach) phrase.message = e.detail.speach;
		if (e.detail.message) phrase.message = e.detail.message;

		phrase.className = e.detail.className;
		phrase.chance = e.detail.chance;

		this.#view.appendMessage(phrase);
	}
}
