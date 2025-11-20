import { EventDispatcher } from "@core/events/Base/EventDispatcher";
import { GameEvent } from "@core/events/Base/GameEvent";
import { beforeEach, describe, test } from "../node_modules/vitest/dist/index";
import { expect } from "../node_modules/vitest/dist/index";
import { vi } from "../node_modules/vitest/dist/index";

let dispatcher;
let testController;

beforeEach(() => {
	dispatcher = new EventDispatcher();
	testController = {
		handler: vi.fn((e) => {
			e;
		}),
	};
});

class TestEvent extends GameEvent {
	constructor(v) {
		super("test@test", { v });
	}
}

describe("EventDispatcher -> subscribe", () => {
	test("subscribe работает предсказуемо", () => {
		dispatcher.subscribe(TestEvent, testController.handler);
		dispatcher.dispatch(new TestEvent(10));
		expect(testController.handler)
			.toHaveBeenCalledTimes(1)
			.toBeCalledWith(
				expect.objectContaining({
					detail: {
						v: 10,
					},
				}),
			);
	});
	test("если subscribe передать не-GameEvent, то выкинет исключение", () => {
		class FalseEvent {
			constructor(v) {
				this.v = v;
			}
		}

		expect(() => dispatcher.subscribe(FalseEvent, testController.handler)).toThrowError(
			/Ожидалось событие типа/,
		);
	});
});

describe("EventDispatcher -> dispatch", () => {
	test("Если вызвать событие, на которое никто не подписан, то dispatch выкинет исключение", () => {
		expect(() => {
			dispatcher.dispatch(new TestEvent(1));
		}).toThrowError(/Нет обработчиков/);
	});
	test("dispatch кидает ошибку, если передан не GameEvent", () => {
		expect(() => dispatcher.dispatch({})).toThrow(/Ожидалось событие типа GameEvent/);
	});
});

describe("EventDispatcher -> unsubscribe", () => {
	test("unsubscribe работает предсказуемо", () => {
		dispatcher.subscribe(TestEvent, testController.handler);
		dispatcher.dispatch(new TestEvent(10));
		expect(testController.handler).toHaveBeenCalledTimes(1);
		expect(testController.handler).toBeCalledWith(
			expect.objectContaining({ detail: { v: 10 } }),
		);

		dispatcher.unsubscribe(TestEvent);

		expect(() => {
			dispatcher.dispatch(new TestEvent(1));
		}).toThrowError(/Нет обработчиков/);
	});

	test("unsubscribe отписывает все хэндлеры события", () => {
		const handlers = {
			h1: vi.fn(),
			h2: vi.fn(),
		};

		dispatcher.subscribe(TestEvent, handlers.h1);
		dispatcher.subscribe(TestEvent, handlers.h2);
		dispatcher.dispatch(new TestEvent(1));
		expect(handlers.h1).toHaveBeenCalledTimes(1);
		expect(handlers.h2).toHaveBeenCalledTimes(1);

		dispatcher.unsubscribe(TestEvent);
		expect(() => {
			dispatcher.dispatch(new TestEvent(1));
		}).toThrowError(/Нет обработчиков/);
	});

	test("unsubscribe не затрагивает другие события", () => {
		class TestEvent2 extends GameEvent {
			constructor(v) {
				super("test2@test", { v });
			}
		}

		dispatcher.subscribe(TestEvent, testController.handler);
		dispatcher.subscribe(TestEvent2, testController.handler);

		dispatcher.dispatch(new TestEvent(1));
		dispatcher.dispatch(new TestEvent2(2));
		expect(testController.handler).toHaveBeenCalledTimes(2);

		dispatcher.dispatch(new TestEvent(1));
		dispatcher.unsubscribe(TestEvent2);

		expect(testController.handler).toHaveBeenCalledTimes(3);
		expect(() => {
			dispatcher.dispatch(new TestEvent2(2));
		}).toThrowError(/Нет обработчиков/);
	});
});
