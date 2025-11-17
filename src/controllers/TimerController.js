import { PlayerMark } from "../configs/enums";
import { BoardResetEvent } from "../core/events/BoardEvents";
import { GameDrawEvent, GameLooseEvent, GameWinEvent } from "../core/events/GameEvents";
import { PlayerMovedEvent } from "../core/events/PlayerEvents";
import { TimerEndEvent } from "../core/events/TimerEvents";
import { Timer } from "../core/Timer";
import { logAction } from "../utils/helpers";

export class TimerController {
	#gameManager;
	#dispatcher;
	#timers = {
		[PlayerMark.Cross]: new Timer(),
		[PlayerMark.Zero]: new Timer(),
	};
	#view;
	#active = true;
	#current;

	constructor({ gameManager, view, dispatcher }) {
		this.#gameManager = gameManager;
		this.#dispatcher = dispatcher;
		this.#view = view;
		this.#current = this.#timers[PlayerMark.Cross];
		this.#view.setTime(this.#current.time);
	}

	boot() {
		this.#subscribe();
	}

	#subscribe() {
		this.#dispatcher.subscribe(PlayerMovedEvent, this.onPlayerMovedHandler.bind(this));
		this.#dispatcher.subscribe(GameWinEvent, this.onGameEndHandler.bind(this));
		this.#dispatcher.subscribe(GameDrawEvent, this.onGameEndHandler.bind(this));
		this.#dispatcher.subscribe(BoardResetEvent, this.onBoardResetHandler.bind(this));
		this.#dispatcher.subscribe(TimerEndEvent, this.onTimerEnd.bind(this));
	}

	handleTimerEnd() {
		logAction(this, TimerEndEvent);
		this.#dispatcher.dispatch(new TimerEndEvent());
	}

	onTimerEnd() {
		if (!this.#active) {
			return;
		}
		logAction(this, GameLooseEvent, this.#gameManager.whoseMove);
		this.#dispatcher.dispatch(new GameLooseEvent(this.#gameManager.whoseMove));
	}

	onPlayerMovedHandler() {
		if (!this.#active) return;
		const next = this.#gameManager.whoseMove;
		const prev = next === PlayerMark.Cross ? PlayerMark.Zero : PlayerMark.Cross;
		const prevTime = this.#view.getRemainingTime?.() ?? this.#timers[prev].time;

		this.#timers[prev].setTime(prevTime);
		this.#current = this.#timers[next];
		this.#view.setTime(this.#current.time);

		if (!this.#view.isRunning()) {
			this.#view.start();
		}
	}

	onGameEndHandler() {
		this.#active = false;
		this.#view.stop();
	}

	onBoardResetHandler() {
		// FIXME: магическое число детектед
		Object.values(this.#timers).forEach((t) => t.reset(5000));
		this.#active = true;
		this.#current = this.#timers[PlayerMark.Cross];
		this.#view.reset();
	}
}
