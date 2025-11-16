import { BoardController } from "../controllers/BoardController";
import { BoardView } from "../ui/views/BoardView";

import { UI } from "../ui/elements";
import { dispatcher } from "./events/Base/EventDispatcher";
import { logAction } from "../utils/helpers";
import { PlayerMovedEvent } from "./events/PlayerEvents";

export class App {
	#gameManager; // FIXME: костыль. Сделал, чтобы остальные контроллеры не поломались. Пофикси

	constructor(gameManager) {
		this.#gameManager = gameManager;
	}

	boot() {
		// TODO: переделать EventDispatcher под DI
		const boardView = new BoardView({
			boardDOM: UI.board,
			onCellClick: (index) => {
				logAction(this, PlayerMovedEvent, index);
				dispatcher.dispatch(new PlayerMovedEvent(index));
			},
		});
		const boardController = new BoardController({
			gameManager: this.#gameManager,
			board: this.#gameManager.board,
			view: boardView,
		});
		boardController.boot();
	}
}
