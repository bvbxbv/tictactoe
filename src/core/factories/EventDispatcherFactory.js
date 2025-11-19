import { EventDispatcher } from "@core/events/Base/EventDispatcher";
import { Factory } from "./Factory";

export class EventDispatcherFactory extends Factory {
	create() {
		return new EventDispatcher();
	}
}
