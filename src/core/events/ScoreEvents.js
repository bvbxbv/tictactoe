import { GameEvent } from "./Base/GameEvent";

export class ScoreChangedEvent extends GameEvent {
	constructor(score) {
		const toPass = {
			cross: score.cross,
			zero: score.zero,
		};
		super("score@changed", toPass);
	}
}
