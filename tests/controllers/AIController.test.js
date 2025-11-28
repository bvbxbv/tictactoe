import { PlayerMark } from "@configs/enums";
import { AIController } from "@controllers/AIController";
import { EventDispatcher } from "@core/events/Base/EventDispatcher";
import { BoardUpdatedEvent } from "@core/events/BoardEvents";
import { GameDrawEvent, GameStartEvent, GameWinEvent } from "@core/events/GameEvents";
import { AIMovedEvent, AIWantsToSpeakEvent, PlayerMovedEvent } from "@core/events/PlayerEvents";
import * as helpers from "@utils/helpers";
import {
	afterEach,
	beforeEach,
	describe,
	expect,
	test,
	vi,
} from "../../node_modules/vitest/dist/index";
import { createGameMock } from "../mocks/Game.mock";
let gameManager, dispatcher, controller;

beforeEach(() => {
	gameManager = createGameMock();
	dispatcher = new EventDispatcher();
	dispatcher.subscribe(PlayerMovedEvent, vi.fn());
	dispatcher.subscribe(BoardUpdatedEvent, vi.fn());
	dispatcher.subscribe(AIWantsToSpeakEvent, vi.fn());
	dispatcher.subscribe(AIMovedEvent, vi.fn());
	controller = new AIController(gameManager, dispatcher);
	controller.boot();
});

describe("AIController -> event dispatching", () => {
	beforeEach(() => {
		controller.onGameStartHandler = vi.fn();
		controller.gameWinHandler = vi.fn();
		controller.gameDrawHandler = vi.fn();
		controller.handleMove = vi.fn();
		controller.boot();

		dispatcher.subscribe(AIWantsToSpeakEvent, vi.fn());
	});

	test("GameStartEvent.onGameStartHandler", () => {
		dispatcher.dispatch(new GameStartEvent());
		expect(controller.onGameStartHandler).toHaveBeenCalled();
	});

	test("GameWinEvent.gameWinHandler", () => {
		dispatcher.dispatch(new GameWinEvent(PlayerMark.Cross, [0, 1, 2]));
		expect(controller.gameWinHandler).toHaveBeenCalledWith(
			expect.objectContaining({
				detail: {
					winner: PlayerMark.Cross,
					combo: [0, 1, 2],
				},
			}),
		);
	});

	test("GameDrawEvent.gameDrawHandler", () => {
		dispatcher.dispatch(new GameDrawEvent());
		expect(controller.gameDrawHandler).toHaveBeenCalled();
	});

	test("PlayerMovedEvent.handleMove", () => {
		dispatcher.dispatch(new PlayerMovedEvent(1));
		expect(controller.handleMove).toHaveBeenCalledWith(
			expect.objectContaining({
				detail: {
					index: 1,
				},
			}),
		);
	});
});

describe("AIController.handleMove", () => {
	beforeEach(() => {
		vi.useFakeTimers();
	});

	afterEach(() => {
		vi.useRealTimers();
	});

	test("Если сейчас не ход AI, то метод не отрабатывает целиком", () => {
		gameManager.isAiMove = false;
		dispatcher.dispatch = vi.fn();
		controller.handleMove();
		expect(gameManager.makeMove).not.toHaveBeenCalled();
		expect(dispatcher.dispatch).not.toHaveBeenCalled();
	});

	test("Game.makeMove вызывается через setTimeout", () => {
		gameManager.isAiMove = true;
		controller.handleMove();
		expect(gameManager.makeMove).not.toHaveBeenCalled();
		vi.runAllTimers();
		expect(gameManager.makeMove).toHaveBeenCalled();
	});

	test("handleMove в случае корректного ввода вызывает AIMovedEvent, BoardUpdatedEvent", () => {
		const spy = vi.spyOn(dispatcher, "dispatch");
		gameManager.isAiMove = true;
		controller.handleMove();
		vi.runAllTimers();
		expect(spy).toHaveBeenNthCalledWith(1, expect.any(AIMovedEvent));
		expect(spy).toHaveBeenNthCalledWith(2, expect.any(BoardUpdatedEvent));
	});
});

describe("GameWinEvent/GameDrawEvent", () => {
	let dispatchSpy;
	beforeEach(() => {
		dispatchSpy = vi.spyOn(dispatcher, "dispatch");
		vi.spyOn(helpers, "gotLucky").mockReturnValue(true);
	});

	test("AIController.gameWinHandler", () => {
		const text = "mock-text";
		vi.spyOn(helpers, "getRandomItem").mockReturnValue({
			message: text,
			className: text,
			chance: 1,
		});

		controller.gameWinHandler({
			detail: {
				winnner: PlayerMark.Cross,
				combo: [0, 1, 2],
			},
		});

		expect(dispatchSpy).toHaveBeenCalledWith(
			expect.objectContaining({
				detail: {
					speach: text,
					className: text,
					chance: 1,
				},
			}),
		);
	});

	test("AIController.gameDrawHandler", () => {
		controller.gameDrawHandler();
		expect(dispatchSpy).toHaveBeenCalledWith(expect.any(AIWantsToSpeakEvent));
	});
});
