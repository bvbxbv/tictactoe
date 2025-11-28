import { PipeMethodNotImplementedError } from "@errors/PipeErrors";

export class Pipe {
	constructor(data) {
		this._data = data;
	}

	execute() {
		throw new PipeMethodNotImplementedError();
	}

	get data() {
		return this._data;
	}
}
