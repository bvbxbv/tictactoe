import { PlayerMark } from "../../configs/enums";
import { UI } from "../elements";

export class ScoreView {
	constructor() {
		this.#bindListeners();
	}

	update({ activePlayerMark = PlayerMark.Cross }) {
		const isCross = activePlayerMark === PlayerMark.Cross;

		const activeScoreEl = isCross ? UI.score.cross : UI.score.zero;
		const inactiveScoreEl = isCross ? UI.score.zero : UI.score.cross;

		activeScoreEl.classList.add("active-score-item");
		activeScoreEl.classList.remove("inactive-score-item");

		inactiveScoreEl.classList.add("inactive-score-item");
		inactiveScoreEl.classList.remove("active-score-item");
	}

	#bindListeners() {}
}
