import { PlayerMark } from "../../configs/enums";

export class ScoreView {
	#crossEl;
	#zeroEl;

	constructor({ crossEl, zeroEl }) {
		this.#crossEl = crossEl;
		this.#zeroEl = zeroEl;
	}

	update({ activePlayerMark = PlayerMark.Cross }) {
		const isCross = activePlayerMark === PlayerMark.Cross;

		const activeScoreEl = isCross ? this.#crossEl : this.#zeroEl;
		const inactiveScoreEl = isCross ? this.#zeroEl : this.#crossEl;

		activeScoreEl.classList.add("active-score-item");
		activeScoreEl.classList.remove("inactive-score-item");

		inactiveScoreEl.classList.add("inactive-score-item");
		inactiveScoreEl.classList.remove("active-score-item");
	}
}
