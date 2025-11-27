import { PlayerMark } from "@configs/enums";
import { BoardResetEvent } from "@core/events/BoardEvents";
import { GameWinEvent, GameDrawEvent } from "@core/events/GameEvents";
import { PlayerMovedEvent, AIMovedEvent } from "@core/events/PlayerEvents";
import { PlayerTimeoutEvent, AITimeoutEvent } from "@core/events/TimerEvents";

export class TimerController {
	#gameManager;
	#dispatcher;
	#view;

	#playerTime = 5000;
	#aiTime = 5000;
	#isStopped = false;

	constructor(gameManager, dispatcher, view) {
		this.#gameManager = gameManager;
		this.#dispatcher = dispatcher;
		this.#view = view;
	}

	boot() {
		this.#subscribe();
	}

	#subscribe() {
		this.#dispatcher.subscribe(PlayerMovedEvent, this.onPlayerMoveHandler.bind(this));
		this.#dispatcher.subscribe(AIMovedEvent, this.onPlayerMoveHandler.bind(this));

		this.#dispatcher.subscribe(GameWinEvent, this.stopAll.bind(this));
		this.#dispatcher.subscribe(GameDrawEvent, this.stopAll.bind(this));

		this.#dispatcher.subscribe(BoardResetEvent, this.reset.bind(this));

		this.#view.setOnTimerEnd(() => {});
	}

	stopAll() {
		this.#isStopped = true;
		this.#view.clear();
		this.#playerTime = 5000;
		this.#aiTime = 5000;
	}

	onPlayerMoveHandler() {
		if (this.#isStopped) return;

		this.#view.clear();

		const isPlayerTurn = this.#gameManager.whoseMove === PlayerMark.Cross;
		const currentTime = isPlayerTurn ? this.#playerTime : this.#aiTime;
		const turnLabel = isPlayerTurn ? "player" : "ai";

		this.#view.start(
			turnLabel,
			currentTime,
			(updatedTime) => {
				if (isPlayerTurn) {
					this.#playerTime = updatedTime;
				} else {
					this.#aiTime = updatedTime;
				}
			},
			() => {
				const event = isPlayerTurn ? new PlayerTimeoutEvent() : new AITimeoutEvent();

				this.#dispatcher.dispatch(event);
			},
		);
	}

	reset() {
		this.#isStopped = false;
		this.#playerTime = 5000;
		this.#aiTime = 5000;
		this.#view.clear();
	}
}
