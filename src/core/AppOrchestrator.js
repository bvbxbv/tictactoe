import { appConfigs } from "@configs/appConfigs";
import { bindFactories } from "@core/bindFactories";
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
import { ScoreFactory } from "./factories/ScoreFactory";

export class AppOrchestrator {
	#container = new InstanceContainer();
	#models = {};
	#views = {};
	#controllers = {};

	#setup() {
		bindFactories(this.#container);

		this.#models.dispatcher = this.#container.get(EventDispatcherFactory);
		this.#models.game = this.#container.get(GameFactory, this.#models.dispatcher);
		this.#models.score = this.#container.get(ScoreFactory, null);

		this.#views.board = this.#container.get(BoardViewFactory);
		this.#views.effects = this.#container.get(EffectsViewFactory, appConfigs.sounds.fanfare);
		this.#views.score = this.#container.get(ScoreViewFactory);
		this.#views.modal = this.#container.get(ModalViewFactory);
		this.#views.timer = this.#container.get(TimerViewFactory, appConfigs.timer.startTime);

		this.#controllers.board = this.#container.get(
			BoardControllerFactory,
			this.#models.game.board,
			this.#views.board,
		);
		this.#controllers.effects = this.#container.get(
			EffectsControllerFactory,
			this.#views.effects,
		);
		this.#controllers.score = this.#container.get(ScoreControllerFactory, this.#views.score);
		this.#controllers.modal = this.#container.get(ModalControllerFactory, this.#views.modal);
		this.#controllers.timer = this.#container.get(TimerControllerFactory, this.#views.timer);

		this.#bindViewsToControllers();
	}

	#bindViewsToControllers() {
		this.#views.board.setOnCellClick(
			this.#controllers.board.handleCellClick.bind(this.#controllers.board),
		);

		this.#views.timer.setOnTimerEnd(
			this.#controllers.timer.handleTimerEnd.bind(this.#controllers.timer),
		);

		this.#views.modal.setOnClose(
			this.#controllers.modal.handleModalClose.bind(this.#controllers.modal),
		);
	}

	run() {
		this.#setup();

		for (const controller of Object.values(this.#controllers)) {
			controller.boot();
		}
	}
}
