import { Factory } from "./Factory";

export class FactoryRegistry {
	#registry = new Map();

	constructor(...factories) {
		for (const factory of factories) {
			if (!(factory instanceof Factory)) {
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
			// FIXME: исключения.
			throw new Error(`FactoryRegistry ничего не знает о ${factoryClass.name}`);
		}
		return factory;
	}

	add(factoryClass) {
		if (!(factoryClass instanceof Factory)) {
			throw new Error(`${factoryClass} это не потомок класса Factory`);
		}

		if (this.has(factoryClass.constructor)) {
			// FIXME: исключения.
			throw new Error(`Фабрика ${factoryClass} уже существует в FactoryRegistry`);
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
