import { GameEvent } from "./GameEvent.js";

export class EventDispatcher {
	#listeners = new Map();

	dispatch(event) {
		if (typeof event !== "object" || !(event instanceof GameEvent)) {
			throw new Error("Ожидалось событие типа GameEvent");
		}

		const eventType = event.constructor;
		if (!this.#listeners.has(eventType)) {
			throw new Error(`Нет обработчиков события ${eventType}`);
		}

		const eventListeners = this.#listeners.get(eventType);
		for (const eventListener of eventListeners) {
			eventListener(event);
		}
	}

	subscribe(event, listener) {
		if (!this.#listeners.has(event)) {
			this.#listeners.set(event, new Set());
		}
		this.#listeners.get(event).add(listener);
	}

	unsubscribe(event) {
		this.#listeners.delete(event);
	}
}
