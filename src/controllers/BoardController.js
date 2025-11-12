import { dispatcher } from "../core/events/Base/EventDispatcher";
import { BoardResetEvent, BoardUpdatedEvent } from "../core/events/BoardEvents";
import { PlayerMovedEvent } from "../core/events/PlayerEvents";
import { BoardView } from "../ui/views/BoardView";

class BoardController {
	#board;
	#gameManager;
	#boardView;

	constructor(gameManager, boardLink) {
		this.#gameManager = gameManager;
		this.#board = boardLink;
		this.#boardView = new BoardView({
			onCellClick: (index) => {
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

	onCellClickHandler(e) {
		const result = this.#gameManager.makeMove(e.detail.index);
		if (!result.ok) {
			return;
		}
		dispatcher.dispatch(new BoardUpdatedEvent(this.#board.serialize()));
	}

	onBoardUpdatedHandler(e) {
		this.#boardView.update({ board: e.detail.board.cells });
	}

	onBoardResetHandler() {
		this.#board.reset();
		dispatcher.dispatch(new BoardUpdatedEvent(this.#board.serialize()));
	}
}

let instance = null;
export function getBoardController(gameManager, boardLink) {
	if (!instance) {
		instance = new BoardController(gameManager, boardLink);
	}

	return instance;
}
