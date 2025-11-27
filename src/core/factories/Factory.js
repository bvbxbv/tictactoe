import { FactoryCreateMethodNotImplementedError } from "@errors/factoryErrors";

export class Factory {
	create() {
		throw new FactoryCreateMethodNotImplementedError();
	}
}

export class ControllerFactory extends Factory {
	#gameManager;
	#dispatcher;
	#store;

	constructor(gameManager, dispatcher, store) {
		super();
		this.#gameManager = gameManager;
		this.#dispatcher = dispatcher;
		this.#store = store;
	}

	get gameManager() {
		return this.#gameManager;
	}

	get dispatcher() {
		return this.#dispatcher;
	}

	get store() {
		return this.#store;
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
