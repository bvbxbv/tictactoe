import { PlayerMark } from "@configs/enums";
import { EventDispatcher } from "@core/events/Base/EventDispatcher";
import { ScoreChangedEvent } from "@core/events/ScoreEvents";
import { Score } from "@models/Score";
import { beforeEach, describe } from "../../node_modules/vitest/dist/index";
import { expect, test } from "../../node_modules/vitest/dist/index";
import { vi } from "../../node_modules/vitest/dist/index";

let dispatcher;
let score;

beforeEach(() => {
	dispatcher = new EventDispatcher();
	score = new Score(dispatcher);
	dispatcher.subscribe(ScoreChangedEvent, vi.fn());
});

describe("Score -> getters/setters", () => {
	test("Score.cross", () => {
		const res = score.cross;
		expect(res).toStrictEqual(0);
	});

	test("Score.cross", () => {
		const res = score.zero;
		expect(res).toStrictEqual(0);
	});

	test("Score.serialize передает копию, а не ссылку", () => {
		const copy = score.serialize();
		copy.cross = 25;
		expect(copy).not.toStrictEqual(score.serialize());
	});
});

describe("Score -> win", () => {
	test("Выкинет исключение если передать не PlayerMark.cross и не PlayerMark.zero", () => {
		expect(() => score.win("228")).toThrowError(/is not player/);
		expect(() => score.win(228)).toThrowError(/is not player/);
		expect(() => score.win({})).toThrowError(/is not player/);
		expect(() => score.win([])).toThrowError(/is not player/);
		expect(() => score.win(null)).toThrowError(/is not player/);
		expect(() => score.win(PlayerMark.Cross)).not.toThrowError(/is not player/);
		expect(() => score.win(PlayerMark.Zero)).not.toThrowError(/is not player/);
	});

	test("Увеличивает счёт только того что передано", () => {
		expect(score.cross).toStrictEqual(0);
		expect(score.zero).toStrictEqual(0);
		score.win(PlayerMark.Cross);
		expect(score.cross).toStrictEqual(1);
		expect(score.zero).toStrictEqual(0);
	});

	test("Если всё норм, то триггерит ScoreChangedEvent", () => {
		const spy = vi.spyOn(dispatcher, "dispatch");
		score.win(PlayerMark.Cross);
		expect(spy).toBeCalledWith(expect.any(ScoreChangedEvent));
	});
});

describe("Score -> reset", () => {
	test("Score.reset", () => {
		score.win(PlayerMark.Cross);
		score.win(PlayerMark.Cross);
		expect(score.cross).toStrictEqual(2);
		expect(score.zero).toStrictEqual(0);
		score.reset();
		expect(score.cross).toStrictEqual(0);
		expect(score.zero).toStrictEqual(0);
	});
});
