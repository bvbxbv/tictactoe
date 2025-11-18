import { GameEvent } from "@core/events/Base/GameEvent";

export class TimerEndEvent extends GameEvent {
	constructor() {
		super("timer@end", null);
	}
}
