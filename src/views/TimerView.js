import { appConfigs } from "@configs/appConfigs";

export class TimerView {
	#intervalId = null;
	#time = 0;

	setOnTimerEnd(cb) {
		this._onTimerEnd = cb;
	}

	clear() {
		if (this.#intervalId !== null) {
			clearInterval(this.#intervalId);
			this.#intervalId = null;
		}
		this.#time = 0;
	}

	start(turn, time, onTick, onEnd) {
		this.clear();
		this.#time = Math.max(0, time);
		this.update(this.#time, turn);
		this.#intervalId = setInterval(() => {
			this.#time -= 20;
			if (this.#time < 0) this.#time = 0;
			this.update(this.#time, turn);
			onTick?.(this.#time);
			if (this.#time === 0) {
				this.clear();
				onEnd?.();
				this._onTimerEnd?.(turn);
			}
		}, 20);
	}

	update(time, turn) {
		appConfigs.UI.timer.display.innerText = (time / 1000).toFixed(2);
		const root = appConfigs.UI.timer.root;
		if (turn === "player") {
			root.classList.add("player-active");
			root.classList.remove("ai-active");
		} else if (turn === "ai") {
			root.classList.add("ai-active");
			root.classList.remove("player-active");
		} else {
			root.classList.remove("player-active", "ai-active");
		}
	}
}
