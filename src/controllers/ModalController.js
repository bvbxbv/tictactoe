import { ModalView } from "../ui/views/ModalView";
import { UI } from "../ui/elements";
import { dispatcher } from "../core/events/Base/EventDispatcher";
import { GameDrawEvent, GameResetEvent, GameWinEvent } from "../core/events/GameEvents";
import { BoardResetEvent } from "../core/events/BoardEvents";
import { logAction, logHandler } from "../utils/helpers";
import { log } from "../utils/consolawrapper";
import { EffectsView } from "../ui/views/EffectsView";

// DEV: фу, вынеси это отсюда. Ты же наш, сибирский. Почему такой выродок?
import fanfareUrl from "../assets/fanfare.wav";

class ModalController {
	#view;
	#gameManager;

	constructor(gameManager) {
		this.#view = new ModalView({
			elements: UI.modal,
			onClose: () => {
				logAction(this, BoardResetEvent);
				dispatcher.dispatch(new BoardResetEvent());
			},
		});
		this.#gameManager = gameManager;
		this.#subscribe();
	}

	#subscribe() {
		dispatcher.subscribe(GameWinEvent, this.onWinHandler.bind(this));
		dispatcher.subscribe(GameDrawEvent, this.onDrawHandler.bind(this));
		dispatcher.subscribe(GameResetEvent, this.onResetHandler.bind(this));
	}

	#showModal(message, board, winCombo) {
		this.#view.update({ message: message, board: board, winCombo: winCombo });
		if (winCombo) {
			// DEV: не возжелай вьюху ближнего. Реализовать контроллер который подпишется на GameWinEvent и воспроизведет звук.
			new EffectsView({ audio: fanfareUrl }).update();
		}
	}

	onWinHandler(e) {
		logHandler(this, GameWinEvent, this.onWinHandler, e.details);
		this.#showModal(`Игра окончена. Победитель: ${e.detail.winner}`, this.#gameManager.board.serialize().cells, e.detail.combo);
	}

	onDrawHandler() {
		logHandler(this, GameDrawEvent, this.onDrawHandler);
		this.#showModal("Победила дружба!", this.#gameManager.board.serialize().cells, null);
	}

	onResetHandler() {
		logHandler(this, BoardResetEvent, this.onResetHandler);
		this.#gameManager.reset();
		logAction(this, BoardResetEvent);
		dispatcher.dispatch(new BoardResetEvent());
	}
}

let instance = null;
export function getModalController(gameManager) {
	if (instance === null) {
		instance = new ModalController(gameManager);
	}

	return instance;
}
