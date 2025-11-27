import { PlayerMark } from "@configs/enums";
import { BoardResetEvent, BoardUpdatedEvent } from "@core/events/BoardEvents";
import { GameStartEvent } from "@core/events/GameEvents";
import { PlayerMovedEvent } from "@core/events/PlayerEvents";
import { log } from "@utils/consolawrapper";
import { logAction, logHandler } from "@utils/helpers";

export class BoardController {
	#board;
	#gameManager;
	#view;
	#dispatcher;
	#store;

	constructor({ gameManager, dispatcher, board, view, store }) {
		this.#dispatcher = dispatcher;
		this.#gameManager = gameManager;
		this.#board = board;
		this.#view = view;
		this.#store = store;
	}

	boot() {
		this.#subscribe();
	}

	handleCellClick(index) {
		if (this.#gameManager.isAiMove) {
			return;
		}

		if (index < 0 || index > 8) {
			throw new Error(`Index must be between 0 and 9. ${index} given`);
		}
		logAction(this, PlayerMovedEvent, index);
		this.#dispatcher.dispatch(new PlayerMovedEvent(index));
	}

	#subscribe() {
		this.#dispatcher.subscribe(PlayerMovedEvent, this.cellClickHandler.bind(this));
		this.#dispatcher.subscribe(BoardUpdatedEvent, this.boardUpdatedHandler.bind(this));
		this.#dispatcher.subscribe(BoardResetEvent, this.boardResetHandler.bind(this));
		this.#dispatcher.subscribe(GameStartEvent, this.onGameStartHandler.bind(this));
	}

	onGameStartHandler() {
		if (this.#store) this.#updateBoardAndDispatch();
		const matches = this.#gameManager.checkComboMatches();
		if (matches) {
			const state = this.#store.state;
			const score = {
				[PlayerMark.Cross]: state.score.cross,
				[PlayerMark.Zero]: state.score.zero,
			};
			logAction(this, BoardResetEvent);
			this.#dispatcher.dispatch(new BoardResetEvent());
			this.#gameManager.score.set(score);
		}
	}

	cellClickHandler(e) {
		if (this.#gameManager.isAiMove) {
			return;
		}

		const result = this.#gameManager.makeMove(e.detail.index);
		if (!result.ok) {
			log.error(
				`${this.#gameManager.constructor.name}.${this.#gameManager.makeMove.name} вернул false. Payload: `,
				e.detail,
			);
			return;
		}
		this.#updateBoardAndDispatch();
	}

	#updateBoardAndDispatch() {
		const payload = this.#board.serialize();
		logAction(this, BoardUpdatedEvent, payload);
		this.#dispatcher.dispatch(new BoardUpdatedEvent(payload));
	}

	boardUpdatedHandler(e) {
		logHandler(this, BoardUpdatedEvent, this.boardUpdatedHandler, e.detail);
		this.#view.update({ board: e.detail.board.cells });
	}

	boardResetHandler() {
		logHandler(this, BoardResetEvent, this.boardResetHandler);
		this.#gameManager.reset();
		this.#updateBoardAndDispatch();
	}
}
