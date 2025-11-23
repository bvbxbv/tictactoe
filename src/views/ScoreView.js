// FIXME: DI
import { appConfigs } from "@configs/appConfigs";
import { PlayerMark } from "@configs/enums";

export class ScoreView {
	#crossEl;
	#zeroEl;
	#crossLabelEl;
	#zeroLabelEl;

	constructor({ crossEl, zeroEl }) {
		this.#crossEl = crossEl;
		this.#zeroEl = zeroEl;

		this.#crossLabelEl = appConfigs.UI.score.crossLabel;
		this.#zeroLabelEl = appConfigs.UI.score.zeroLabel;
	}

	update({ activePlayerMark = PlayerMark.Cross, cross = undefined, zero = undefined }) {
		this.#updateWhoseMove(activePlayerMark);

		if (cross !== undefined && zero !== undefined) {
			this.#updateScore(cross, zero);
		}
	}

	#updateWhoseMove(activePlayerMark) {
		const isCross = activePlayerMark === PlayerMark.Cross;

		const activeScoreEl = isCross ? this.#crossEl : this.#zeroEl;
		const inactiveScoreEl = isCross ? this.#zeroEl : this.#crossEl;

		activeScoreEl.classList.add("active-score-item");
		activeScoreEl.classList.remove("inactive-score-item");

		inactiveScoreEl.classList.add("inactive-score-item");
		inactiveScoreEl.classList.remove("active-score-item");
	}

	#updateScore(cross, zero) {
		this.#crossLabelEl.innerText = cross;
		this.#zeroLabelEl.innerText = zero;
	}
}
