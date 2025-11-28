import { GameEvent } from "@core/events/Base/GameEvent";

export class GameStartEvent extends GameEvent {
	constructor() {
		super("game@start", null);
	}
}

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

export class GameRestartEvent extends GameEvent {
	constructor() {
		super("game@restart", null);
	}
}

export class GameDrawEvent extends GameEvent {
	constructor() {
		super("game@draw", null);
	}
}

export class GameSurrendEvent extends GameEvent {
	constructor(message = null) {
		super("player@surrend", { message });
	}
}

export class ChatUpdatedEvent extends GameEvent {
	constructor(phrase) {
		super("chat@updated", { phrase });
	}
}

export class GameEndEvent extends GameEvent {
	constructor() {
		super("game@end", null);
	}
}
