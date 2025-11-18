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
import { log } from "../utils/consolawrapper";
import { EventDispatcher } from "./events/Base/EventDispatcher";
import { BoardControllerFactory } from "./factories/BoardControllerFactory";
import { ControllerFactoryRegistry } from "./factories/ControllerFactoryRegistry";
import { EffectsControllerFactory } from "./factories/EffectsControllerFactory";
import { ModalControllerFactory } from "./factories/ModalControllerFactory";
import { ScoreControllerFactory } from "./factories/ScoreControllerFactory";
import { TimerControllerFactory } from "./factories/TimerControllerFactory";
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
		const registry = new ControllerFactoryRegistry(
			new BoardControllerFactory(this.#gameManager, this.#dispatcher),
			new EffectsControllerFactory(this.#gameManager, this.#dispatcher),
			new ScoreControllerFactory(this.#gameManager, this.#dispatcher),
			new ModalControllerFactory(this.#gameManager, this.#dispatcher),
			new TimerControllerFactory(this.#gameManager, this.#dispatcher),
		);

		this.#controllers.boardController = registry
			.get(BoardControllerFactory)
			.create(this.#gameManager.board, this.#views.boardView);

		this.#controllers.effectsController = registry
			.get(EffectsControllerFactory)
			.create(this.#views.effectsView);

		this.#controllers.scoreController = registry
			.get(ScoreControllerFactory)
			.create(this.#views.scoreView);

		this.#controllers.modalController = registry
			.get(ModalControllerFactory)
			.create(this.#views.modalView);

		this.#controllers.timerController = registry
			.get(TimerControllerFactory)
			.create(this.#views.timerView);
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
