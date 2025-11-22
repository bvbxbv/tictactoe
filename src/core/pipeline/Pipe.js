export class Pipe {
	constructor(data) {
		this._data = data;
	}

	execute() {
		// FIXME: error
		throw new Error("В потомке Pipe должен быть реализован метод execute");
	}

	get data() {
		return this._data;
	}
}
