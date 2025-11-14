import { dispatcher } from "../core/events/Base/EventDispatcher";
import { BoardResetEvent, BoardUpdatedEvent } from "../core/events/BoardEvents";
import { PlayerMovedEvent } from "../core/events/PlayerEvents";
import { BoardView } from "../ui/views/BoardView";
import { log } from "../utils/consolawrapper";
import { logAction, logHandler } from "../utils/helpers";

class BoardController {
	#board;
	#gameManager;
	#boardView;

	constructor(gameManager, boardLink) {
		this.#gameManager = gameManager;
		this.#board = boardLink;
		this.#boardView = new BoardView({
			onCellClick: (index) => {
				logAction(this, PlayerMovedEvent, index);
				dispatcher.dispatch(new PlayerMovedEvent(index));
			},
		});
		this.#subscribe();
	}

	#subscribe() {
		const _onCellClickHandler = this.onCellClickHandler.bind(this);
		const _onBoardUpdatedHandler = this.onBoardUpdatedHandler.bind(this);
		const _onBoardResetHandler = this.onBoardResetHandler.bind(this);

		dispatcher.subscribe(PlayerMovedEvent, _onCellClickHandler);
		dispatcher.subscribe(BoardUpdatedEvent, _onBoardUpdatedHandler);
		dispatcher.subscribe(BoardResetEvent, _onBoardResetHandler);
	}

	#updateBoardAndDispatch() {
		const payload = this.#board.serialize();
		logAction(this, BoardUpdatedEvent, payload);
		dispatcher.dispatch(new BoardUpdatedEvent(payload));
	}

	onCellClickHandler(e) {
		logHandler(this, PlayerMovedEvent, this.onCellClickHandler, e.detail);
		const result = this.#gameManager.makeMove(e.detail.index);
		if (!result.ok) {
			log.error(`${this.#gameManager.constructor.name}.${this.#gameManager.makeMove.name} вернул false. Payload: `, e.detail);
			return;
		}
		this.#updateBoardAndDispatch();
	}

	onBoardUpdatedHandler(e) {
		logHandler(this, BoardUpdatedEvent, this.onBoardUpdatedHandler, e.detail);
		this.#boardView.update({ board: e.detail.board.cells });
	}

	onBoardResetHandler() {
		logHandler(this, BoardResetEvent, this.onBoardResetHandler);
		this.#gameManager.reset();
		this.#updateBoardAndDispatch();
	}
}

let instance = null;
export function getBoardController(gameManager, boardLink) {
	if (!instance) {
		instance = new BoardController(gameManager, boardLink);
	}

	return instance;
}
