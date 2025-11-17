import fanfareUrl from "../assets/fanfare.wav";
import { BoardController } from "../controllers/BoardController";
import { EffectsController } from "../controllers/EffectsController";
import { ModalController } from "../controllers/ModalController";
import { ScoreController } from "../controllers/ScoreController";
import { UI } from "../ui/elements";
import { BoardView } from "../ui/views/BoardView";
import { EffectsView } from "../ui/views/EffectsView";
import { ModalView } from "../ui/views/ModalView";
import { ScoreView } from "../ui/views/ScoreView";
import { logAction } from "../utils/helpers";
import { BoardResetEvent } from "./events/BoardEvents";
import { PlayerMovedEvent } from "./events/PlayerEvents";

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

		const modalView = new ModalView({
			elements: UI.modal,
			onClose: () => {
				logAction(this, BoardResetEvent);
				this.#dispatcher.dispatch(new BoardResetEvent());
			},
		});
		const modalController = new ModalController({
			gameManager: this.#gameManager,
			view: modalView,
			dispatcher: this.#dispatcher,
		});
		modalController.boot();
	}
}
