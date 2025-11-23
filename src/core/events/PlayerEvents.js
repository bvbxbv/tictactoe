import { GameEvent } from "@core/events/Base/GameEvent";

export class PlayerMovedEvent extends GameEvent {
	constructor(index) {
		super("player@moved", { index });
	}
}

export class AIMovedEvent extends GameEvent {
	constructor() {
		super("ai@moved", null);
	}
}

export class AIWantsToSpeakEvent extends GameEvent {
	constructor(speach, className = "toast") {
		super("ai@speak", { speach, className });
	}
}
