import { GameEvent } from "./Base/GameEvent";

export class PlayerMovedEvent extends GameEvent {
	constructor(index) {
		super("player@moved", { index });
	}
}
