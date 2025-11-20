// @ts-check
/// <reference types="vitest" />
import { TimerController } from "@controllers/TimerController";
import { EventDispatcher } from "@core/events/Base/EventDispatcher";
import { BoardResetEvent } from "@core/events/BoardEvents";
import { GameDrawEvent, GameLooseEvent, GameWinEvent } from "@core/events/GameEvents";
import { PlayerMovedEvent } from "@core/events/PlayerEvents";
import { TimerEndEvent } from "@core/events/TimerEvents";
import { beforeEach, describe, expect, test, vi } from "../../node_modules/vitest/dist/index";
let gameManager, dispatcher, view, controller;
beforeEach(() => {
	gameManager = {
		get whoseMove() {
			return "X";
		},
	};

	dispatcher = new EventDispatcher();
	dispatcher.subscribe(GameLooseEvent, vi.fn());
	dispatcher.subscribe(BoardResetEvent, vi.fn());

	view = {
		setTime: vi.fn(),
		reset: vi.fn(),
		start: vi.fn(),
		stop: vi.fn(),
		isRunning: vi.fn(() => false),
	};

	controller = new TimerController({
		gameManager: gameManager,
		view: view,
		dispatcher: dispatcher,
	});
	controller.boot();
});

describe("Подписка на события", () => {
	beforeEach(() => {
		controller.onPlayerMovedHandler = vi.fn();
		controller.onGameEndHandler = vi.fn();
		controller.onBoardResetHandler = vi.fn();
		controller.onTimerEnd = vi.fn();
		controller.boot();
	});

	test("PlayerMovedEvent", () => {
		dispatcher.dispatch(new PlayerMovedEvent(0));
		expect(controller.onPlayerMovedHandler).toHaveBeenCalledWith(
			expect.objectContaining({
				detail: {
					index: 0,
				},
			}),
		);
	});

	test("GameWinEvent", () => {
		dispatcher.dispatch(new GameWinEvent("", []));
		expect(controller.onGameEndHandler).toHaveBeenCalledWith(
			expect.objectContaining({
				detail: {
					winner: "",
					combo: [],
				},
			}),
		);
	});

	test("GameDrawEvent", () => {
		dispatcher.dispatch(new GameDrawEvent());
		expect(controller.onGameEndHandler).toHaveBeenCalled();
	});

	test("BoardResetEvent", () => {
		dispatcher.dispatch(new BoardResetEvent());
		expect(controller.onBoardResetHandler).toHaveBeenCalled();
	});

	test("TimerEndEvent", () => {
		dispatcher.dispatch(new TimerEndEvent());
		expect(controller.onTimerEnd).toHaveBeenCalled();
	});
});

describe("Поведение при триггере событий", () => {
	test("PlayerMovedEvent (view.isRunning = false)", () => {
		dispatcher.dispatch(new PlayerMovedEvent(0));
		expect(view.start).toHaveBeenCalled();
	});

	test("PlayerMovedEvent (view.isRunning = true)", () => {
		view.isRunning.mockReturnValueOnce(true);
		dispatcher.dispatch(new PlayerMovedEvent(0));
		expect(view.start).not.toHaveBeenCalled();
	});

	test("GameWinEvent", () => {
		dispatcher.dispatch(new GameWinEvent("X", [0, 1, 2]));
		expect(view.stop).toHaveBeenCalled();
	});

	test("GameDrawEvent", () => {
		dispatcher.dispatch(new GameDrawEvent());
		expect(view.stop).toHaveBeenCalled();
	});

	test("BoardResetEvent", () => {
		dispatcher.dispatch(new BoardResetEvent());
		expect(view.reset).toHaveBeenCalled();
	});

	test("TimerEndEvent", () => {
		const spy = vi.spyOn(dispatcher, "dispatch");
		dispatcher.dispatch(new TimerEndEvent());
		expect(spy).toHaveBeenCalledWith(expect.any(GameLooseEvent));
	});
});
