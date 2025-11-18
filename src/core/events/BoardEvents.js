import { GameEvent } from "@core/events/Base/GameEvent";

export class BoardUpdatedEvent extends GameEvent {
	constructor(board) {
		super("board@updated", { board });
	}
}

export class BoardResetEvent extends GameEvent {
	constructor() {
		super("board@reset", null);
	}
}
