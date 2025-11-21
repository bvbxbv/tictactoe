import { GameEvent } from "@core/events/Base/GameEvent.js";
import { EventHasNoHandlerError, IncorrectEventClassError } from "@errors/eventDispatcherErrors";

export class EventDispatcher {
	#listeners = new Map();

	dispatch(event) {
		if (typeof event !== "object" || !(event instanceof GameEvent)) {
			throw new IncorrectEventClassError();
		}

		const eventType = event.constructor;
		if (!this.#listeners.has(eventType)) {
			throw new EventHasNoHandlerError(eventType);
		}

		const eventListeners = this.#listeners.get(eventType);
		for (const eventListener of eventListeners) {
			eventListener(event);
		}
	}

	subscribe(event, listener) {
		if (!(event.prototype instanceof GameEvent)) {
			throw new IncorrectEventClassError();
		}

		if (!this.#listeners.has(event)) {
			this.#listeners.set(event, new Set());
		}
		this.#listeners.get(event).add(listener);
	}

	unsubscribe(event) {
		this.#listeners.delete(event);
	}
}
