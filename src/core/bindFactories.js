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
import { EventDispatcherFactory } from "./factories/EventDispatcherFactory";
import { GameFactory } from "./factories/GameFactory";
import { ScoreFactory } from "./factories/ScoreFactory";

export function bindFactories(container) {
	container
		.register(new EventDispatcherFactory())
		.register(new ScoreFactory())
		.register(new BoardFactory())
		.register(new GameFactory())
		.register(new AIControllerFactory());

	const dispatcher = container.get(EventDispatcherFactory);
	const score = container.get(ScoreFactory, dispatcher);
	const board = container.get(BoardFactory, dispatcher);
	const game = container.get(GameFactory, dispatcher, board, score);
	container.get(AIControllerFactory, game, dispatcher);

	// views
	container
		.register(new BoardViewFactory(appConfigs.UI.board))
		.register(new EffectsViewFactory(appConfigs.sounds.fanfare))
		.register(
			new ScoreViewFactory({
				crossEl: appConfigs.UI.score.cross,
				zeroEl: appConfigs.UI.score.zero,
			}),
		)
		.register(new ModalViewFactory(appConfigs.UI.modal));

	// controllers
	container
		.register(new BoardControllerFactory(game, dispatcher))
		.register(new EffectsControllerFactory(game, dispatcher))
		.register(new ScoreControllerFactory(game, dispatcher))
		.register(new ModalControllerFactory(game, dispatcher));

	return container;
}
