import { appConfigs } from "@configs/appConfigs";
import { CellState, PlayerMark } from "@configs/enums";
import { BoardUpdatedEvent } from "@core/events/BoardEvents";
import {
	GameDrawEvent,
	GameRestartEvent,
	GameStartEvent,
	GameWinEvent,
} from "@core/events/GameEvents";
import { AIMovedEvent, AIWantsToSpeakEvent, PlayerMovedEvent } from "@core/events/PlayerEvents";
import { Pipeline } from "@core/pipeline/Pipeline";
import { Game } from "@models/Game";
import { DefensiveMovePipe } from "@pipes/DefensiveMovePipe";
import { DummyMovePipe } from "@pipes/DummyMovePipe";
import { TryingToForkPipe } from "@pipes/TryingToForkPipe";
import { WinningMovePipe } from "@pipes/WinningMovePipe";
import { getRandomItem, gotLucky, logAction, random } from "@utils/helpers";

export class AIController {
	#gameManager;
	#dispatcher;
	#store;

	constructor(gameManager, dispatcher, view, store) {
		this.#gameManager = gameManager;
		this.#dispatcher = dispatcher;
		this.#store = store;
	}

	boot() {
		this.#subscribe();
	}

	#subscribe() {
		this.#dispatcher.subscribe(PlayerMovedEvent, this.handleMove.bind(this));
		this.#dispatcher.subscribe(GameWinEvent, this.gameWinHandler.bind(this));
		this.#dispatcher.subscribe(GameDrawEvent, this.gameDrawHandler.bind(this));
		this.#dispatcher.subscribe(GameStartEvent, this.onGameStartHandler.bind(this));
		this.#dispatcher.subscribe(GameRestartEvent, () => {
			this.setNewName();
		});
	}

	onGameStartHandler() {
		if (this.#gameManager.isAiMove) {
			this.#dispatcher.dispatch(new PlayerMovedEvent(null));
			this.handleMove();
		}

		const state = this.#store.state;
		if (state.aiName === undefined || state.aiName === null) {
			this.setNewName();
		}
	}

	setNewName() {
		const state = this.#store.state;
		const name = getRandomItem(appConfigs.AI.nicknames);
		state.aiName = name;
		this.#store.set(state);
	}

	handleMove() {
		if (!this.#gameManager.isAiMove || this.#gameManager.isGameEnded) {
			return;
		}

		const pipeline = new Pipeline([
			WinningMovePipe,
			DefensiveMovePipe,
			TryingToForkPipe,
			DummyMovePipe,
		]);

		const response = pipeline
			.passThrough({
				_mark: PlayerMark.Zero,
				_combos: Game.combos,
				_isEmpty: this.#gameManager.board.cells.every((c) => c === CellState.Empty),
				_freeIndexes: this.#gameManager.board.freeCells,
				_busyIndexes: this.#gameManager.board.busyCells,
				_crossIndexes: this.#gameManager.board.movesOf(PlayerMark.Cross),
				_zeroIndexes: this.#gameManager.board.movesOf(PlayerMark.Zero),
			})
			.run(this.#gameManager.board.cells);

		const delay = random(appConfigs.AI.response.delay.min, appConfigs.AI.response.delay.max);
		setTimeout(() => {
			this.#gameManager.makeMove(response.index);

			if (!this.#gameManager.isAiMove) {
				this.#dispatchMessageWithChance(response.message);
			}

			logAction(this, AIMovedEvent, response.index);
			this.#dispatcher.dispatch(new AIMovedEvent());

			logAction(this, BoardUpdatedEvent, this.#gameManager.board.serialize());
			this.#dispatcher.dispatch(new BoardUpdatedEvent(this.#gameManager.board.serialize()));
		}, delay);
	}

	gameWinHandler(e) {
		if (e.detail.winner !== PlayerMark) return;
		const phrase = getRandomItem(appConfigs.AI.messages.loose);
		this.#dispatchMessageWithChance(phrase);
	}

	gameDrawHandler() {
		const phrase = getRandomItem(appConfigs.AI.messages.draw);
		this.#dispatchMessageWithChance(phrase);
	}

	#dispatchMessageWithChance(phrase) {
		if (!gotLucky(phrase.chance)) return;
		const nickname = this.#store.state.aiName;
		const { message, className, chance } = phrase;
		logAction(this, AIWantsToSpeakEvent, { nickname, message, className, chance });
		this.#dispatcher.dispatch(new AIWantsToSpeakEvent(nickname, message, className, chance));
	}
}
