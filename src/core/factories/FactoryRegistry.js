export class FactoryRegistry {
	#registry = new Map();

	constructor(...factories) {
		for (const factory of factories) {
			this.#registry.set(factory.constructor, factory);
		}
	}

	get(factoryClass) {
		const factory = this.#registry.get(factoryClass);
		if (!factory) {
			// FIXME: исключения.
			throw new Error(`FactoryRegistry ничего не знает о ${factoryClass.constructor.name}`);
		}
		return factory;
	}

	add(factoryClass) {
		if (this.has(factoryClass)) {
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
