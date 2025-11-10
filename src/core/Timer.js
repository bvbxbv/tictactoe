export class Timer {
	#intervalId;
	#lastStart;
	#remaining = 5 * 1000;
	#startTime;

	#onTick;

	constructor(startTime = 5000, onTick = null) {
		this.#startTime = startTime;
		this.#remaining = this.#startTime;
		this.#onTick = onTick;
	}

	start() {
		this.#lastStart = Date.now();
		this.#intervalId = setInterval(() => {
			const now = Date.now();
			const elapsed = now - this.#lastStart;
			this.#lastStart = now;
			this.#remaining -= elapsed;

			if (this.#remaining <= 0) {
				this.#onTick?.(0);
				this.stop();
			}

			if (this.#remaining > 0) {
				this.#onTick?.(this.#remaining);
			}
		}, 10);
	}
	stop() {
		if (this.#intervalId) {
			clearInterval(this.#intervalId);
			this.#intervalId = null;
		}
	}
	reset() {
		clearInterval(this.#intervalId);
		this.#intervalId = null;
		this.#remaining = this.#startTime;
		this.#lastStart = null;
		this.#onTick?.(this.#remaining);
	}
}
