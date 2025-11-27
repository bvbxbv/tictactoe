import { BoardResetEvent } from "@core/events/BoardEvents";
import { AITimeoutEvent, PlayerTimeoutEvent } from "@core/events/TimerEvents";
import {
	GameDrawEvent,
	GameResetEvent,
	GameSurrendEvent,
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
		this.#dispatcher.subscribe(GameSurrendEvent, this.onSurrendHandler.bind(this));
		this.#dispatcher.subscribe(PlayerTimeoutEvent, this.onPlayerTimeoutHandler.bind(this));
		this.#dispatcher.subscribe(AITimeoutEvent, this.onAITimeoutHandler.bind(this));
	}

	onPlayerTimeoutHandler() {
		logHandler(this, PlayerTimeoutEvent, this.onPlayerTimeoutHandler);
		this.#showModal(
			`Время истекло. Вы проиграли`,
			this.#gameManager.board.serialize().cells,
			null,
		);
	}

	onAITimeoutHandler() {
		logHandler(this, AITimeoutEvent, this.onAITimeoutHandler);
		this.#showModal(
			`Кто бы мог подумать, время машины истекло. Вы выиграли`,
			this.#gameManager.board.serialize().cells,
			null,
		);
	}

	handleModalClose() {
		logAction(this, BoardResetEvent);
		this.#dispatcher.dispatch(new BoardResetEvent());
	}

	#showModal(message, board, winCombo) {
		this.#view.update({
			message: message,
			board: board,
			winCombo: winCombo,
		});
	}

	onWinHandler(e) {
		logHandler(this, GameWinEvent, this.onWinHandler, e.details);
		this.#showModal(
			`Игра окончена. Победитель: ${e.detail.winner}`,
			this.#gameManager.board.serialize().cells,
			e.detail.combo,
		);
	}

	onSurrendHandler(e) {
		logHandler(this, GameSurrendEvent, this.onSurrendHandler, e.details);
		this.#showModal(e.detail.message, this.#gameManager.board.serialize().cells);
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
}
