import { appConfigs } from "../configs/appConfigs";
import { sounds } from "../configs/sounds";
import { BoardController } from "../controllers/BoardController";
import { EffectsController } from "../controllers/EffectsController";
import { ModalController } from "../controllers/ModalController";
import { ScoreController } from "../controllers/ScoreController";
import { TimerController } from "../controllers/TimerController";
import { BoardView } from "../ui/views/BoardView";
import { EffectsView } from "../ui/views/EffectsView";
import { ModalView } from "../ui/views/ModalView";
import { ScoreView } from "../ui/views/ScoreView";
import { TimerView } from "../ui/views/TimerView";
import { EventDispatcher } from "./events/Base/EventDispatcher";
import { Game } from "./Game";

export class AppComposer {
	#gameManager = null;
	#dispatcher = null;
	#views = {};
	#controllers = {};

	createGame() {
		this.#gameManager = new Game(this.#dispatcher);
	}

	createDispatcher() {
		this.#dispatcher = new EventDispatcher();
	}

	registerViews() {
		this.#views.boardView = new BoardView({
			boardDOM: appConfigs.UI.board,
			onCellClick: null,
		});
		this.#views.effectsView = new EffectsView({ audio: sounds.fanfare });
		this.#views.scoreView = new ScoreView({
			crossEl: appConfigs.UI.score.cross,
			zeroEl: appConfigs.UI.score.zero,
		});

		this.#views.modalView = new ModalView({
			elements: appConfigs.UI.modal,
			onClose: null,
		});
		this.#views.timerView = new TimerView({
			startTime: appConfigs.timer.startTime,
			timerEl: appConfigs.UI.timerDisplay,
			onTimerEnd: null,
		});
	}

	registerControllers() {
		this.#controllers.boardController = new BoardController({
			gameManager: this.#gameManager,
			dispatcher: this.#dispatcher,
			board: this.#gameManager.board,
			view: this.#views.boardView,
		});
		this.#controllers.effectsController = new EffectsController({
			view: this.#views.effectsView,
			dispatcher: this.#dispatcher,
		});
		this.#controllers.scoreController = new ScoreController({
			gameManager: this.#gameManager,
			view: this.#views.scoreView,
			dispatcher: this.#dispatcher,
		});
		this.#controllers.modalController = new ModalController({
			gameManager: this.#gameManager,
			view: this.#views.modalView,
			dispatcher: this.#dispatcher,
		});
		this.#controllers.timerController = new TimerController({
			gameManager: this.#gameManager,
			view: this.#views.timerView,
			dispatcher: this.#dispatcher,
		});
	}

	connectViewsToControllers() {
		this.#views.boardView.setOnCellClick(
			this.#controllers.boardController.handleCellClick.bind(
				this.#controllers.boardController,
			),
		);
		this.#views.timerView.setOnTimerEnd(
			this.#controllers.timerController.handleTimerEnd.bind(
				this.#controllers.timerController,
			),
		);
		this.#views.modalView.setOnClose(
			this.#controllers.modalController.handleModalClose.bind(
				this.#controllers.modalController,
			),
		);
	}

	init() {
		if (this.#gameManager !== null && this.#dispatcher !== null) {
			throw new Error("Повторная инициализация контейнера");
		}

		this.createDispatcher();
		this.createGame();
		this.registerViews();
		this.registerControllers();
		this.connectViewsToControllers();
	}

	run() {
		this.init();

		for (const controller of Object.values(this.#controllers)) {
			controller.boot();
		}
	}

	get controllers() {
		return { ...this.#controllers };
	}

	get dispatcher() {
		return this.#dispatcher;
	}

	get gameManager() {
		return this.#gameManager;
	}
}
