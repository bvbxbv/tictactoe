import { GameError } from "./BaseError";

export class IncorrectEventClassError extends GameError {
	constructor() {
		super("Ожидалось событие типа GameEvent");
	}
}

export class EventHasNoHandlerError extends GameError {
	constructor(event) {
		super(`Нет обработчиков события ${event}`);
	}
}
