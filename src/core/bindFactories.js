import { appConfigs } from "@configs/appConfigs";
import { BoardControllerFactory } from "@core/factories/controllers/BoardControllerFactory";
import { EffectsControllerFactory } from "@core/factories/controllers/EffectsControllerFactory";
import { ModalControllerFactory } from "@core/factories/controllers/ModalControllerFactory";
import { ScoreControllerFactory } from "@core/factories/controllers/ScoreControllerFactory";
import { BoardViewFactory } from "@factories/views/BoardViewFactory";
import { EffectsViewFactory } from "@factories/views/EffectsViewFactory";
import { ModalViewFactory } from "@factories/views/ModalViewFactory";
import { ScoreViewFactory } from "@factories/views/ScoreViewFactory";
import { BoardFactory } from "./factories/BoardFactory";
import { AIControllerFactory } from "./factories/controllers/AIControllerFactory";
import { ChatControllerFactory } from "./factories/controllers/ChatControllerFactory";
import { ControlsControllerFactory } from "./factories/controllers/ControlsControllerFactory";
import { TimerControllerFactory } from "./factories/controllers/TimerControllerFactory";
import { EventDispatcherFactory } from "./factories/EventDispatcherFactory";
import { GameFactory } from "./factories/GameFactory";
import { ScoreFactory } from "./factories/ScoreFactory";
import { ChatViewFactory } from "./factories/views/ChatViewFactory";
import { ControlsViewFactory } from "./factories/views/ControlsViewFactory";
import { TimerViewFactory } from "./factories/views/TimerViewFactory";
import { Store } from "./Store";

export function bindFactories(container) {
	container
		.register(new EventDispatcherFactory())
		.register(new ScoreFactory())
		.register(new BoardFactory())
		.register(new GameFactory());

	const dispatcher = container.get(EventDispatcherFactory);
	const store = new Store({ dispatcher: dispatcher });
	const score = container.get(ScoreFactory, dispatcher, store);
	const board = container.get(BoardFactory, dispatcher, store.state.board.cells);
	const game = container.get(GameFactory, dispatcher, board, score, store);

	// views
	container
		.register(new BoardViewFactory(appConfigs.UI.board))
		.register(new EffectsViewFactory(appConfigs.sounds.win))
		.register(new ControlsViewFactory(appConfigs.UI.gameControls))
		.register(new ChatViewFactory(appConfigs.UI.chat.chat))
		.register(
			new ScoreViewFactory({
				crossEl: appConfigs.UI.score.cross,
				zeroEl: appConfigs.UI.score.zero,
			}),
		)
		.register(new TimerViewFactory(appConfigs.UI.timer))
		.register(new ModalViewFactory(appConfigs.UI.modal));

	// controllers
	container
		.register(new BoardControllerFactory(game, dispatcher, store))
		.register(new EffectsControllerFactory(game, dispatcher, store))
		.register(new ScoreControllerFactory(game, dispatcher, store))
		.register(new ModalControllerFactory(game, dispatcher, store))
		.register(new ControlsControllerFactory(game, dispatcher, store))
		.register(new AIControllerFactory(game, dispatcher, store))
		.register(new ChatControllerFactory(game, dispatcher, store))
		.register(new TimerControllerFactory(game, dispatcher, store));

	return container;
}
