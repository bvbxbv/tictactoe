import { GameEvent } from "./Base/GameEvent";

export class PlayerTimeoutEvent extends GameEvent {
	constructor() {
		super("timer@player_timeout", null);
	}
}

export class AITimeoutEvent extends GameEvent {
	constructor() {
		super("timer@ai_timeout", null);
	}
}
