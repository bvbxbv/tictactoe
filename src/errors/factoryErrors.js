import { GameError } from "./BaseError";

export class FactoryCreateMethodNotImplementedError extends GameError {
	constructor() {
		const message = "Метод create должен быть реализован в наследнике.";
		super(message);
	}
}

export class FactoryRegistryHasNoGivenFactoryError extends GameError {
	constructor(factoryName) {
		super(`FactoryRegistry ничего не знает о ${factoryName}`);
	}
}

export class ArgumentIsNotFactoryError extends GameError {
	constructor(factoryName) {
		super(`${factoryName} это не потомок класса Factory`);
	}
}

export class FactoryRegistryDuplicateError extends GameError {
	constructor(factoryName) {
		super(`Фабрика ${factoryName} уже существует в FactoryRegistry`);
	}
}
