import { appConfigs } from "@configs/appConfigs";
import { CellChangedEvent } from "@core/events/BoardEvents";
import { GameWinEvent } from "@core/events/GameEvents";
import { logHandler } from "@utils/helpers";

export class EffectsController {
	#view;
	#dispatcher;
	#gameManager;
	#store;

	constructor({ view, dispatcher, gameManager, store }) {
		this.#view = view;
		this.#dispatcher = dispatcher;
		this.#gameManager = gameManager;
		this.#store = store;
	}

	boot() {
		this.#subscribe();
	}

	#subscribe() {
		this.#dispatcher.subscribe(GameWinEvent, this.onGameWinHandler.bind(this));
		this.#dispatcher.subscribe(CellChangedEvent, this.onCellChanged.bind(this));
	}

	onGameWinHandler() {
		const aiWinPreset = appConfigs.AI.messages[this.#store.state.aiName].emojiPresets.aiWin;
		const aiLoosePreset = appConfigs.AI.messages[this.#store.state.aiName].emojiPresets.aiLoose;
		const confetti = { emojis: this.#gameManager.isAiMove ? aiWinPreset : aiLoosePreset };
		const sound = this.#gameManager.isAiMove ? appConfigs.sounds.loose : appConfigs.sounds.win;
		logHandler(this, GameWinEvent, this.onGameWinHandler);
		this.#view.showWinScreen({ confetti: confetti, audioUrl: sound });
	}

	onCellChanged() {
		this.#view.playSound(appConfigs.sounds.cellClick);
	}
}
