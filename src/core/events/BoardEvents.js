import { GameEvent } from "./Base/GameEvent";

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
