import { appConfigs } from "@configs/appConfigs";
import { CellChangedEvent } from "@core/events/BoardEvents";
import { GameWinEvent } from "@core/events/GameEvents";
import { AIWantsToSpeakEvent } from "@core/events/PlayerEvents";
import { getRandomItem, logHandler } from "@utils/helpers";

export class EffectsController {
	#view;
	#dispatcher;
	#gameManager;

	constructor({ view, dispatcher, gameManager }) {
		this.#view = view;
		this.#dispatcher = dispatcher;
		this.#gameManager = gameManager;
	}

	boot() {
		this.#subscribe();
	}

	#subscribe() {
		this.#dispatcher.subscribe(GameWinEvent, this.onGameWinHandler.bind(this));
		this.#dispatcher.subscribe(CellChangedEvent, this.onCellChanged.bind(this));
		this.#dispatcher.subscribe(AIWantsToSpeakEvent, this.onAIWantsToSpeak.bind(this));
	}

	onGameWinHandler() {
		const aiWinPreset = getRandomItem(appConfigs.jsConfetti.emojisPresets.aiWin);
		const aiLoosePreset = getRandomItem(appConfigs.jsConfetti.emojisPresets.aiLoose);
		const confetti = { emojis: this.#gameManager.isAiMove ? aiWinPreset : aiLoosePreset };
		const sound = this.#gameManager.isAiMove ? appConfigs.sounds.loose : appConfigs.sounds.win;

		const phrase = getRandomItem(appConfigs.AI.messages.loose);
		if (!this.#gameManager.isAiMove) {
			this.onAIWantsToSpeak(
				new AIWantsToSpeakEvent(phrase.message, phrase.className, phrase.chance),
			);
		}

		logHandler(this, GameWinEvent, this.onGameWinHandler);
		this.#view.showWinScreen({ confetti: confetti, audioUrl: sound });
	}

	onAIWantsToSpeak(e) {
		const text = e.detail.speach;
		const className = e.detail.className;
		this.#view.showMessageInChat(text, className);
	}

	onCellChanged() {
		this.#view.playSound(appConfigs.sounds.cellClick);
	}
}
