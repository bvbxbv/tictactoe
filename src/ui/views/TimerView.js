export class TimerView {
	#timerId = null;
	#time = 0;
	#startTime = 0;
	#timerEl = null;
	#onTimerEnd = null;

	// FIXME: кхм-кхм.
	constructor({ startTime = 5000, timerEl, onTimerEnd }) {
		this.#startTime = startTime;
		this.#time = startTime;
		this.#timerEl = timerEl;
		this.#onTimerEnd = onTimerEnd;
		this.update();
	}

	setOnTimerEnd(onTimerEnd) {
		this.#onTimerEnd = onTimerEnd;
	}

	getRemainingTime() {
		return this.#time;
	}

	isRunning() {
		return this.#timerId !== null;
	}

	setTime(ms) {
		this.#time = Math.max(0, Math.trunc(ms));
		this.update();
	}

	reset() {
		this.stop();
		this.#time = this.#startTime;
		this.update();
	}

	start() {
		if (this.#timerId) return;
		this.#timerId = setInterval(() => {
			this.#time -= 10;
			this.update();

			if (this.#time <= 0) {
				this.stop();
				this.#onTimerEnd?.();
			}
		}, 10);
	}

	stop() {
		if (this.#timerId) {
			clearInterval(this.#timerId);
			this.#timerId = null;
		}
	}

	update() {
		const s = Math.floor(this.#time / 1000);
		const ms = this.#time % 1000;
		this.#timerEl.innerText = `${String(s).padStart(2, "0")}:${String(ms).padStart(3, "0")}`;
	}
}
