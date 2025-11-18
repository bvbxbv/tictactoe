// FIXME: реализовать классы для всех исключений в проекте.
export class Factory {
	create() {
		throw new Error("Метод create должен быть реализован в наследнике.");
	}
}

export class ControllerFactory extends Factory {
	#gameManager;
	#dispatcher;

	constructor(gameManager, dispatcher) {
		super();
		this.#gameManager = gameManager;
		this.#dispatcher = dispatcher;
	}

	get gameManager() {
		return this.#gameManager;
	}

	get dispatcher() {
		return this.#dispatcher;
	}
}

export class ViewFactory extends Factory {
	#domElement;

	constructor(domElement) {
		super();
		this.#domElement = domElement;
	}

	get domElement() {
		return this.#domElement;
	}
}
