import { GameEvent } from "@core/events/Base/GameEvent";

export class PlayerMovedEvent extends GameEvent {
	constructor(index) {
		super("player@moved", { index });
	}
}

export class PlayerChangedEvent extends GameEvent {
	constructor(activePlayerMark) {
		super("player@changed", { activePlayerMark });
	}
}

export class AIMovedEvent extends GameEvent {
	constructor() {
		super("ai@moved", null);
	}
}

export class AIWantsToSpeakEvent extends GameEvent {
	constructor(nickname, speach, className = "toast", chance) {
		super("ai@speak", { nickname, speach, className, chance });
	}
}
