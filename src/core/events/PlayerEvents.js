import { GameEvent } from "@core/events/Base/GameEvent";

export class PlayerMovedEvent extends GameEvent {
	constructor(index) {
		super("player@moved", { index });
	}
}
