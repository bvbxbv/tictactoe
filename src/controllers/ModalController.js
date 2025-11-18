import { BoardResetEvent } from "@core/events/BoardEvents";
import {
	GameDrawEvent,
	GameLooseEvent,
	GameResetEvent,
	GameWinEvent,
} from "../core/events/GameEvents";
import { logAction, logHandler } from "../utils/helpers";

export class ModalController {
	#view;
	#gameManager;
	#dispatcher;

	constructor({ gameManager, view, dispatcher }) {
		this.#view = view;
		this.#dispatcher = dispatcher;
		this.#gameManager = gameManager;
	}

	boot() {
		this.#subscribe();
	}

	#subscribe() {
		this.#dispatcher.subscribe(GameWinEvent, this.onWinHandler.bind(this));
		this.#dispatcher.subscribe(GameDrawEvent, this.onDrawHandler.bind(this));
		this.#dispatcher.subscribe(GameResetEvent, this.onResetHandler.bind(this));
		this.#dispatcher.subscribe(GameLooseEvent, this.onLooseHandler.bind(this));
	}

	handleModalClose() {
		logAction(this, BoardResetEvent);
		this.#dispatcher.dispatch(new BoardResetEvent());
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
