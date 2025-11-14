import { PlayerMark } from "../configs/enums";
import { dispatcher } from "../core/events/Base/EventDispatcher";
import { BoardResetEvent } from "../core/events/BoardEvents";
import { GameDrawEvent, GameLooseEvent, GameWinEvent } from "../core/events/GameEvents";
import { PlayerMovedEvent } from "../core/events/PlayerEvents";
import { Timer } from "../core/Timer";
import { UI } from "../ui/elements";
import { TimerView } from "../ui/views/TimerView";
import { logAction } from "../utils/helpers";

class TimerController {
	#gameManager;
	#timers = {
		[PlayerMark.Cross]: new Timer(),
		[PlayerMark.Zero]: new Timer(),
	};
	#view;
	#active = true;
	#current;

	constructor(gameManager) {
		this.#gameManager = gameManager;

		// FIXME: долой магические числа. Создай конфиг файлы уже.
		this.#view = new TimerView({
			startTime: 5000,
			timerEl: UI.timerDisplay,
			onEnd: () => {
				if (!this.#active) return;
				logAction(this, GameLooseEvent, this.#gameManager.whoseMove);
				dispatcher.dispatch(new GameLooseEvent(this.#gameManager.whoseMove));
			},
		});
		this.#current = this.#timers[PlayerMark.Cross];
		this.#view.setTime(this.#current.time);

		this.#subscribe();
	}

	#subscribe() {
		dispatcher.subscribe(PlayerMovedEvent, this.onPlayerMovedHandler.bind(this));
		dispatcher.subscribe(GameWinEvent, this.onGameEndHandler.bind(this));
		dispatcher.subscribe(GameDrawEvent, this.onGameEndHandler.bind(this));
		dispatcher.subscribe(BoardResetEvent, this.onBoardResetHandler.bind(this));
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

let instance = null;
export function getTimerController(gameManager) {
	if (!instance) {
		instance = new TimerController(gameManager);
	}

	return instance;
}
