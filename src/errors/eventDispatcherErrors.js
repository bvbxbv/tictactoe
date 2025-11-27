import { GameError } from "./BaseError";

export class IncorrectEventClassError extends GameError {
	constructor(given) {
		super("Ожидалось событие типа GameEvent. Получено: " + given);
	}
}

export class EventHasNoHandlerError extends GameError {
	constructor(event) {
		super(`Нет обработчиков события ${event}`);
	}
}
