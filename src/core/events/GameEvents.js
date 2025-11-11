import { GameEvent } from "./Base/GameEvent";

export class GameResetEvent extends GameEvent {
	constructor() {
		super("game@reset", null);
	}
}

export class GameWinEvent extends GameEvent {
	constructor(winner, combo) {
		super("game@win", { winner, combo });
	}
}

export class GameDrawEvent extends GameEvent {
	constructor() {
		super("game@draw", null);
	}
}
