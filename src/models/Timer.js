export class Timer {
	remaining = 0;

	constructor(startMs = 5000) {
		this.remaining = startMs;
	}

	get time() {
		return this.remaining;
	}

	setTime(ms) {
		this.remaining = Math.max(0, Math.trunc(ms));
	}

	reset(ms) {
		this.remaining = ms;
	}
}
