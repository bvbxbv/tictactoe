// FIXME: переделать хэш мапу на очередь
// FIXME: переделать event dispatcher из глобального модуля в то, что будет пробрасываться через контроллеры
// FIXME: сделать Laravel-like middleware, который будет логировать ивенты и их хэндлеры сам.
import { GameEvent } from "./GameEvent.js";

export class EventDispatcher {
	static #instance = null;
	#listeners = new Map();

	constructor() {
		if (EventDispatcher.#instance) {
			return EventDispatcher.#instance;
		}

		EventDispatcher.#instance = this;
	}

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
