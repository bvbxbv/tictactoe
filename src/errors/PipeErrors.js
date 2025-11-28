import { GameError } from "./BaseError";

export class PipeMethodNotImplementedError extends GameError {
	constructor() {
		super("В потомке Pipe должен быть реализован метод execute");
	}
}
