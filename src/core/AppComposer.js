import { appConfigs } from "../configs/appConfigs";
import { EventDispatcher } from "./events/Base/EventDispatcher";
import { BoardControllerFactory } from "./factories/BoardControllerFactory";
import { BoardViewFactory } from "./factories/BoardViewFactory";
import { EffectsControllerFactory } from "./factories/EffectsControllerFactory";
import { EffectsViewFactory } from "./factories/EffectsViewFactory";
import { FactoryRegistry } from "./factories/FactoryRegistry";
import { ModalControllerFactory } from "./factories/ModalControllerFactory";
import { ModalViewFactory } from "./factories/ModalViewFactory";
import { ScoreControllerFactory } from "./factories/ScoreControllerFactory";
import { ScoreViewFactory } from "./factories/ScoreViewFactory";
import { TimerControllerFactory } from "./factories/TimerControllerFactory";
import { TimerViewFactory } from "./factories/TimerViewFactory";
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
		const registry = new FactoryRegistry(
			new BoardViewFactory(appConfigs.UI.board),
			new EffectsViewFactory(null),
			new ScoreViewFactory({
				crossEl: appConfigs.UI.score.cross,
				zeroEl: appConfigs.UI.score.zero,
			}),
			new ModalViewFactory(appConfigs.UI.modal),
			new TimerViewFactory(appConfigs.UI.timerDisplay),
		);

		this.#views.boardView = registry.get(BoardViewFactory).create();
		this.#views.effectsView = registry
			.get(EffectsViewFactory)
			.create(appConfigs.sounds.fanfare);
		this.#views.scoreView = registry.get(ScoreViewFactory).create();
		this.#views.modalView = registry.get(ModalViewFactory).create();
		this.#views.timerView = registry.get(TimerViewFactory).create(appConfigs.timer.startTime);
	}

	registerControllers() {
		const registry = new FactoryRegistry(
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
