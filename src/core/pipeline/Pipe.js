export class Pipe {
	#data;

	constructor(data) {
		this.#data = data;
	}

	execute() {
		// exception
		throw new Error("В потомке Pipe должен быть реализован метод execute");
	}

	get data() {
		return JSON.parse(JSON.stringify(this.#data));
	}
}
