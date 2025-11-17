import { BoardResetEvent } from "../core/events/BoardEvents";
import {
	GameDrawEvent,
	GameLooseEvent,
	GameResetEvent,
	GameWinEvent,
} from "../core/events/GameEvents";
import { UI } from "../ui/elements";
import { ModalView } from "../ui/views/ModalView";
import { logAction, logHandler } from "../utils/helpers";

class ModalController {
	#view;
	#gameManager;
	#dispatcher;

	constructor({ gameManager, dispatcher }) {
		this.#view = new ModalView({
			elements: UI.modal,
			onClose: () => {
				logAction(this, BoardResetEvent);
				this.#dispatcher.dispatch(new BoardResetEvent());
			},
		});
		this.#dispatcher = dispatcher;
		this.#gameManager = gameManager;
		this.#subscribe();
	}

	#subscribe() {
		this.#dispatcher.subscribe(GameWinEvent, this.onWinHandler.bind(this));
		this.#dispatcher.subscribe(GameDrawEvent, this.onDrawHandler.bind(this));
		this.#dispatcher.subscribe(GameResetEvent, this.onResetHandler.bind(this));
		this.#dispatcher.subscribe(GameLooseEvent, this.onLooseHandler.bind(this));
	}

	#showModal(message, board, winCombo) {
		this.#view.update({ message: message, board: board, winCombo: winCombo });
	}

	onWinHandler(e) {
		logHandler(this, GameWinEvent, this.onWinHandler, e.details);
		this.#showModal(
			`Игра окончена. Победитель: ${e.detail.winner}`,
			this.#gameManager.board.serialize().cells,
			e.detail.combo,
		);
	}

	onDrawHandler() {
		logHandler(this, GameDrawEvent, this.onDrawHandler);
		this.#showModal("Победила дружба!", this.#gameManager.board.serialize().cells, null);
	}

	onResetHandler() {
		logHandler(this, BoardResetEvent, this.onResetHandler);
		this.#gameManager.reset();
		logAction(this, BoardResetEvent);
		this.#dispatcher.dispatch(new BoardResetEvent());
	}

	onLooseHandler(e) {
		logHandler(this, GameLooseEvent, this.onLooseHandler, e.detail);
		this.#showModal(
			`Игра окончена. Проигравший: ${e.detail.looser}`,
			this.#gameManager.board.serialize().cells,
			null,
		);
	}
}

let instance = null;
export function getModalController({ gameManager, dispatcher }) {
	if (instance === null) {
		instance = new ModalController({ gameManager: gameManager, dispatcher: dispatcher });
	}

	return instance;
}
