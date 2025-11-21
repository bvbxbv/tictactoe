import { GameError } from "./BaseError";

export class ArgumentIsNotPlayerMarkError extends GameError {
	constructor(mark) {
		super(`${mark} is not player`);
	}
}
