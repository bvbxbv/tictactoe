import { Factory } from "@core/factories/Factory";
import { InstanceContainer } from "@core/InstanceContainer";
import { log } from "@utils/consolawrapper";
import { describe, test, expect, beforeEach, vi } from "../node_modules/vitest/dist/index";

let container;

class Test {
	constructor(v1, v2) {
		this.v1 = v1;
		this.v2 = v2;
	}
}

class TestFactory extends Factory {
	create(v1, v2) {
		return new Test(v1, v2);
	}
}

class TestFactory2 extends Factory {
	create(v1, v2) {
		return new Test(v1, v2);
	}
}

describe("InstanceContainer", () => {
	beforeEach(() => {
		container = new InstanceContainer(new TestFactory());
	});

	test("get создает инстанс через фабрику и возвращает его", () => {
		const instance = container.get(TestFactory, 1, 2);
		expect(instance instanceof Test).toBe(true);
		expect(instance.v1).toBe(1);
		expect(instance.v2).toBe(2);
	});

	test("get возвращает один и тот же экземпляр при повторных вызовах", () => {
		const instance = container.get(TestFactory, 1, 2);
		const instance2 = container.get(TestFactory, 3, 4);
		expect(instance).toBe(instance2);
		expect(instance2.v1).toBe(1);
	});

	test("register добавляет фабрику в реестр", () => {
		container.register(new TestFactory2());
		const instance = container.get(TestFactory2, 5, 6);
		expect(instance instanceof Test).toBe(true);
		expect(instance.v1).toBe(5);
		expect(instance.v2).toBe(6);
	});

	test("clear удаляет экземпляр по имени или все экземпляры", () => {
		const instance = container.get(TestFactory, 1, 2);
		container.clear(TestFactory);
		expect(container.get(TestFactory)).not.toBe(instance);

		const instance2 = container.get(TestFactory, 3, 4);
		const instance3 = container.register(new TestFactory2()).get(TestFactory2, 7, 8);
		container.clear();

		expect(container.get(TestFactory)).not.toBe(instance2);
		expect(container.get(TestFactory2)).not.toBe(instance3);
	});

	test("register/validate кидает ошибку для не-фабрики", () => {
		const fake = {};
		const spy = vi.spyOn(log, "error").mockImplementation(() => {});
		container.register(fake);
		expect(spy).toHaveBeenCalled();
	});
});
