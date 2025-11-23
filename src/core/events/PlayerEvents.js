import { GameEvent } from "@core/events/Base/GameEvent";

export class PlayerMovedEvent extends GameEvent {
	constructor(index) {
		super("player@moved", { index });
	}
}

export class AIMovedEvent extends GameEvent {
	constructor(message) {
		super("ai@moved", { message });
	}
}
