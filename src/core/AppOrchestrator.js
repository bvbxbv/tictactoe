import { appConfigs } from "@configs/appConfigs";
import { bindFactories } from "@core/bindFactories";
import { BoardControllerFactory } from "@core/factories/controllers/BoardControllerFactory";
import { EffectsControllerFactory } from "@core/factories/controllers/EffectsControllerFactory";
import { ModalControllerFactory } from "@core/factories/controllers/ModalControllerFactory";
import { ScoreControllerFactory } from "@core/factories/controllers/ScoreControllerFactory";
import { InstanceContainer } from "@core/InstanceContainer";
import { EventDispatcherFactory } from "@factories/EventDispatcherFactory";
import { GameFactory } from "@factories/GameFactory";
import { BoardViewFactory } from "@factories/views/BoardViewFactory";
import { EffectsViewFactory } from "@factories/views/EffectsViewFactory";
import { ModalViewFactory } from "@factories/views/ModalViewFactory";
import { ScoreViewFactory } from "@factories/views/ScoreViewFactory";
import { BoardFactory } from "./factories/BoardFactory";
import { AIControllerFactory } from "./factories/controllers/AIControllerFactory";
import { ControlsControllerFactory } from "./factories/controllers/ControlsControllerFactory";
import { ScoreFactory } from "./factories/ScoreFactory";
import { ControlsViewFactory } from "./factories/views/ControlsViewFactory";

export class AppOrchestrator {
	#container = new InstanceContainer();
	#models = {};
	#views = {};
	#controllers = {};

	#setup() {
		bindFactories(this.#container);

		this.#models.dispatcher = this.#container.get(EventDispatcherFactory);
		this.#models.board = this.#container.get(
			BoardFactory,
			this.#models,
			this.#models.dispatcher,
		);
		this.#models.game = this.#container.get(
			GameFactory,
			this.#models.dispatcher,
			this.#models.board,
		);
		this.#models.score = this.#container.get(ScoreFactory, null);

		this.#views.board = this.#container.get(BoardViewFactory);
		this.#views.effects = this.#container.get(EffectsViewFactory, appConfigs.sounds.win);
		this.#views.score = this.#container.get(ScoreViewFactory);
		this.#views.modal = this.#container.get(ModalViewFactory);
		this.#views.controls = this.#container.get(ControlsViewFactory, appConfigs.UI.gameControls);

		this.#controllers.controls = this.#container.get(
			ControlsControllerFactory,
			this.#models.game,
			this.#models.dispatcher,
			this.#views.controls,
		);

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

		this.#controllers.ai = this.#container.get(AIControllerFactory, null);

		this.#bindViewsToControllers();
	}

	#bindViewsToControllers() {
		this.#views.board.setOnCellClick(
			this.#controllers.board.handleCellClick.bind(this.#controllers.board),
		);

		this.#views.modal.setOnClose(
			this.#controllers.modal.handleModalClose.bind(this.#controllers.modal),
		);

		this.#views.controls.setOnRestartGameButtonClick(
			this.#controllers.controls.onRestartGameHandler.bind(this.#controllers.controls),
		);
		this.#views.controls.setOnToggleVolumeButtonClick(
			this.#controllers.controls.onToggleVolumeHandler.bind(this.#controllers.controls),
		);
		this.#views.controls.setOnSwitchColorThemeButtonClick(
			this.#controllers.controls.onSwitchColorThemeHandler.bind(this.#controllers.controls),
		);
		this.#views.controls.setOnGiveUpButtonClick(
			this.#controllers.controls.onGiveUpHandler.bind(this.#controllers.controls),
		);
		this.#views.controls.setOnOpenMenuButtonClick(
			this.#controllers.controls.onOpenMenuHandler.bind(this.#controllers.controls),
		);
	}

	run() {
		this.#setup();

		for (const controller of Object.values(this.#controllers)) {
			controller.boot();
		}
	}
}
