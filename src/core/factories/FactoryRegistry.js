import {
	ArgumentIsNotFactoryError,
	FactoryRegistryDuplicateError,
	FactoryRegistryHasNoGivenFactoryError,
} from "@errors/factoryErrors";
import { ControllerFactory, Factory, ViewFactory } from "./Factory";

export class FactoryRegistry {
	#registry = new Map();

	constructor(...factories) {
		for (const factory of factories) {
			if (
				!(factory instanceof Factory) &&
				!(factory instanceof ControllerFactory) &&
				!(factory instanceof ViewFactory)
			) {
				throw new Error(`${factory.constructor.name} это не потомок класса Factory`);
			}

			if (this.#registry.has(factory.constructor)) {
				throw new Error(`${factory.constructor.name} - дубликат`);
			}
			this.#registry.set(factory.constructor, factory);
		}
	}

	get(factoryClass) {
		const factory = this.#registry.get(factoryClass);
		if (!factory) {
			throw new FactoryRegistryHasNoGivenFactoryError(factoryClass.name);
		}
		return factory;
	}

	add(factoryClass) {
		if (!(factoryClass instanceof Factory)) {
			throw new ArgumentIsNotFactoryError(factoryClass);
		}

		if (this.has(factoryClass.constructor)) {
			// FIXME: исключения.
			throw new FactoryRegistryDuplicateError(factoryClass);
		}

		this.#registry.set(factoryClass.constructor, factoryClass);
	}

	validate(condition, onFail) {
		this.#registry.forEach((value) => {
			if (!condition(value)) {
				onFail(value);
			}
		});
	}

	has(factoryClass) {
		return this.#registry.has(factoryClass);
	}
}
