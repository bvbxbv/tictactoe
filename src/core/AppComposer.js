import { appConfigs } from "@configs/appConfigs";
import { registryFactories } from "@core/app.registry";
import { BoardControllerFactory } from "@core/factories/controllers/BoardControllerFactory";
import { EffectsControllerFactory } from "@core/factories/controllers/EffectsControllerFactory";
import { ModalControllerFactory } from "@core/factories/controllers/ModalControllerFactory";
import { ScoreControllerFactory } from "@core/factories/controllers/ScoreControllerFactory";
import { TimerControllerFactory } from "@core/factories/controllers/TimerControllerFactory";
import { InstanceContainer } from "@core/InstanceContainer";
import { EventDispatcherFactory } from "@factories/EventDispatcherFactory";
import { GameFactory } from "@factories/GameFactory";
import { BoardViewFactory } from "@factories/views/BoardViewFactory";
import { EffectsViewFactory } from "@factories/views/EffectsViewFactory";
import { ModalViewFactory } from "@factories/views/ModalViewFactory";
import { ScoreViewFactory } from "@factories/views/ScoreViewFactory";
import { TimerViewFactory } from "@factories/views/TimerViewFactory";

export class AppComposer {
	#gameManager = null;
	#dispatcher = null;
	#container;
	#views = {};
	#controllers = {};

	createContainer() {
		this.#container = registryFactories(new InstanceContainer());
	}

	createDispatcher() {
		this.#dispatcher = this.#container.get(EventDispatcherFactory);
	}

	createGame() {
		this.#gameManager = this.#container.get(GameFactory, this.#dispatcher);
	}

	registerViews() {
		this.#views.boardView = this.#container.get(BoardViewFactory);
		this.#views.effectsView = this.#container.get(
			EffectsViewFactory,
			appConfigs.sounds.fanfare,
		);
		this.#views.scoreView = this.#container.get(ScoreViewFactory);
		this.#views.modalView = this.#container.get(ModalViewFactory);
		this.#views.timerView = this.#container.get(TimerViewFactory, appConfigs.timer.startTime);
	}

	registerControllers() {
		this.#controllers.boardController = this.#container.get(
			BoardControllerFactory,
			this.#gameManager.board,
			this.#views.boardView,
		);

		this.#controllers.effectsController = this.#container.get(
			EffectsControllerFactory,
			this.#views.effectsView,
		);

		this.#controllers.scoreController = this.#container.get(
			ScoreControllerFactory,
			this.#views.scoreView,
		);

		this.#controllers.modalController = this.#container.get(
			ModalControllerFactory,
			this.#views.modalView,
		);

		this.#controllers.timerController = this.#container.get(
			TimerControllerFactory,
			this.#views.timerView,
		);
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

		this.createContainer();
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
