import { GameEvent } from "./Base/GameEvent";

export class TimerEndEvent extends GameEvent {
	constructor() {
		super("timer@end", null);
	}
}
