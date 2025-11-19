import { log } from "@utils/consolawrapper";
import { Factory } from "./factories/Factory";
import { FactoryRegistry } from "./factories/FactoryRegistry";

export class InstanceContainer {
	#instances = new Map();
	#factoryRegistry = new FactoryRegistry();

	constructor(...factories) {
		this.#factoryRegistry = new FactoryRegistry(...factories);
		this.#validateRegistry();
	}

	#validateRegistry() {
		this.#factoryRegistry.validate(
			(factory) => factory instanceof Factory,
			(result) => {
				throw new Error(`${result?.constructor?.name} это не экземпляр Factory`); // FIXME: отдельный класс для исключения
			},
		);
	}

	register(factoryClass) {
		try {
			this.#factoryRegistry.add(factoryClass);
			this.#validateRegistry();
		} catch (error) {
			log.error(error);
		}

		return this;
	}

	get(factoryClass, ...args) {
		if (!this.#hasInstance(factoryClass)) {
			if (!this.#hasFactory(factoryClass)) {
				this.#factoryRegistry.add(factoryClass);
			}
			const factoryInstance = this.#factoryRegistry.get(factoryClass).create(...args);
			this.#instances.set(factoryClass, factoryInstance);
			return this.#instances.get(factoryClass);
		}

		return this.#instances.get(factoryClass);
	}

	clear(name) {
		if (name) {
			this.#instances.delete(name);
		} else {
			this.#instances.clear();
		}
	}

	#hasFactory(factory) {
		return this.#factoryRegistry.has(factory);
	}
	#hasInstance(instance) {
		return this.#instances.has(instance);
	}
}
