import { Factory } from "@core/factories/Factory";
import { FactoryRegistry } from "@core/factories/FactoryRegistry";
import { describe, test, expect, vi, beforeEach } from "../../node_modules/vitest/dist/index";

let registry;

class Test {
	constructor(v1, v2, v3) {
		this.v1 = v1;
		this.v2 = v2;
		this.v3 = v3;
	}
}

class TestFactory extends Factory {
	constructor() {
		super();
	}

	create(v1, v2, v3) {
		return new Test(v1, v2, v3);
	}
}

class TestFactory2 extends Factory {
	constructor() {
		super();
	}

	create(v1, v2, v3) {
		return new Test(v1, v2, v3);
	}
}

describe("FactoryRegistry -> constructor", () => {
	test("конструктор успешно сохраняет фабрики", () => {
		registry = new FactoryRegistry(new TestFactory());
		const obj = registry.get(TestFactory).create(1, 2, 3);
		expect(obj.v1).toStrictEqual(1);
		expect(obj.v2).toStrictEqual(2);
		expect(obj.v3).toStrictEqual(3);
	});

	test("конструктор выкинет исключение при добавлении дубликата фабрики через конструктор", () => {
		expect(() => {
			registry = new FactoryRegistry(new TestFactory(), new TestFactory());
		}).toThrowError(/дубликат/);
	});

	test("конструктор сохраняет только потомки класса Factory", () => {
		expect(() => {
			registry = new FactoryRegistry(new TestFactory(), new TestFactory());
		}).not.toThrowError(/не потомок класса Factory/);

		expect(() => {
			registry = new FactoryRegistry(new TestFactory(), new TestFactory2(), new Test());
		}).toThrowError(/не потомок класса Factory/);
	});
});

describe("FactoryRegistry -> get", () => {
	beforeEach(() => {
		registry = new FactoryRegistry(new TestFactory(), new TestFactory2());
	});

	test("get вернет фабрику, если она в реестре", () => {
		const obj1 = registry.get(TestFactory);
		expect(obj1 instanceof TestFactory).toBe(true);
		expect(obj1.create(1, 2, 3) instanceof Test).toBe(true);

		const obj2 = registry.get(TestFactory2);
		expect(obj2 instanceof TestFactory2).toBe(true);
		expect(obj2.create(1, 2, 3) instanceof Test).toBe(true);
	});

	test("get выкинет исключение, если фабрики нет в реестре", () => {
		expect(() => {
			registry.get(Test);
		}).toThrowError(/FactoryRegistry ничего не знает/);
	});
});

describe("FactoryRegistry -> add", () => {
	beforeEach(() => {
		registry = new FactoryRegistry();
	});

	test("add добавляет фабрику в реестр", () => {
		expect(() => {
			registry.get(TestFactory);
		}).toThrowError(/FactoryRegistry ничего не знает/);

		registry.add(new TestFactory());
		expect(registry.get(TestFactory) instanceof TestFactory).toBe(true);
	});

	test("add выкинет исключение если добавляемая фабрика это не потомок Factory", () => {
		expect(() => {
			registry.add(new Test(1, 2, 3));
		}).toThrowError(/это не потомок класса Factory/);
	});

	test("add выкинет исключение если фабрика уже существует в реестре", () => {
		registry.add(new TestFactory());
		expect(() => {
			registry.add(new TestFactory());
		}).toThrowError(/уже существует/);
	});
});

describe("FactoryRegistry -> validate", () => {
	let condition, onFail;

	beforeEach(() => {
		registry = new FactoryRegistry(new TestFactory());
		condition = vi.fn((f) => f.constructor.name.startsWith("T"));
		onFail = vi.fn();
	});

	test("validate.condition выполнится 1 раз, validate.onFail - 0", () => {
		registry.validate(condition, onFail);
		expect(condition).toHaveBeenCalledTimes(1);
		expect(onFail).toHaveBeenCalledTimes(0);
	});

	test("validate.condition выполнится 2 раза, onFail - 0", () => {
		registry.add(new TestFactory2());
		registry.validate(condition, onFail);
		expect(condition).toHaveBeenCalledTimes(2);
		expect(onFail).toHaveBeenCalledTimes(0);
	});

	test("validate.condition выполнится 2 раза, onFail - 2", () => {
		registry.add(new TestFactory2());
		condition = vi.fn((f) => f.constructor.name.startsWith("Z"));
		registry.validate(condition, onFail);
		expect(condition).toHaveBeenCalledTimes(2);
		expect(onFail).toHaveBeenCalledTimes(2);
	});
});

describe("FactoryRegistry -> has", () => {
	test("has работает так как задумывалось", () => {
		registry = new FactoryRegistry(new TestFactory());
		expect(registry.has(TestFactory)).toBe(true);
		expect(registry.has(TestFactory2)).toBe(false);
	});
});

describe("FactoryRegistry -> edge cases", () => {
	beforeEach(() => {
		registry = new FactoryRegistry();
	});

	test("validate на пустом реестре не вызывает condition и onFail", () => {
		const condition = vi.fn();
		const onFail = vi.fn();
		registry.validate(condition, onFail);
		expect(condition).not.toHaveBeenCalled();
		expect(onFail).not.toHaveBeenCalled();
	});

	test("разные фабрики не смешиваются и create возвращает разные объекты", () => {
		const factory = new TestFactory();
		const factory2 = new TestFactory2();
		registry.add(factory);
		registry.add(factory2);

		const obj = registry.get(TestFactory).create(1, 2, 3);
		const obj2 = registry.get(TestFactory2).create(1, 2, 3);

		expect(obj).not.toBe(obj2);
		const f1 = registry.get(TestFactory);
		const f2 = registry.get(TestFactory2);
		expect(f1).not.toBe(f2);
	});
});
