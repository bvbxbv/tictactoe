export class ControllerFactoryRegistry {
	#factories = new Map();

	constructor(...factories) {
		for (const factory of factories) {
			this.#factories.set(factory.constructor, factory);
		}
	}

	get(factoryClass) {
		const factory = this.#factories.get(factoryClass);
		if (!factory) {
			// FIXME: исключения.
			throw new Error(
				`ControllerFactoryRegistry ничего не знает о ${factoryClass.constructor.name}`,
			);
		}
		return factory;
	}
}
