import { BoardController } from "../controllers/BoardController";
import { BoardView } from "../ui/views/BoardView";
import { UI } from "../ui/elements";
import { logAction } from "../utils/helpers";
import { PlayerMovedEvent } from "./events/PlayerEvents";
import { EffectsController } from "../controllers/EffectsController";
import { EffectsView } from "../ui/views/EffectsView";
import { ScoreView } from "../ui/views/ScoreView";
import { ScoreController } from "../controllers/ScoreController";

import fanfareUrl from "../assets/fanfare.wav";

export class App {
	#gameManager; // FIXME: костыль. Сделал, чтобы остальные контроллеры не поломались. Пофикси
	#dispatcher; // FIXME: такой же костыль

	constructor(gameManager, dispatcher) {
		this.#gameManager = gameManager;
		this.#dispatcher = dispatcher;
	}

	boot() {
		// TODO: переделать EventDispatcher под DI
		const boardView = new BoardView({
			boardDOM: UI.board,
			onCellClick: (index) => {
				logAction(this, PlayerMovedEvent, index);
				this.#dispatcher.dispatch(new PlayerMovedEvent(index));
			},
		});
		const boardController = new BoardController({
			gameManager: this.#gameManager,
			dispatcher: this.#dispatcher,
			board: this.#gameManager.board,
			view: boardView,
		});
		boardController.boot();

		const effectsView = new EffectsView({ audio: fanfareUrl });
		const effectsController = new EffectsController({
			view: effectsView,
			dispatcher: this.#dispatcher,
		});
		effectsController.boot();

		const scoreView = new ScoreView({ crossEl: UI.score.cross, zeroEl: UI.score.zero });
		const scoreController = new ScoreController({
			gameManager: this.#gameManager,
			view: scoreView,
			dispatcher: this.#dispatcher,
		});
		scoreController.boot();
	}
}
