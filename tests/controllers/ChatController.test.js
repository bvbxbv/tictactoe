import { PlayerMark } from "@configs/enums";
import { ChatController } from "@controllers/ChatController";
import { EventDispatcher } from "@core/events/Base/EventDispatcher";
import { GameRestartEvent, GameStartEvent, GameWinEvent } from "@core/events/GameEvents";
import { AIWantsToSpeakEvent } from "@core/events/PlayerEvents";
import { beforeEach, describe, test, vi } from "../../node_modules/vitest/dist/index";
import { expect } from "../../node_modules/vitest/dist/index";
import { createGameMock } from "../mocks/Game.mock";

let controller, gameManager, dispatcher, view, store;

beforeEach(() => {
	gameManager = createGameMock();
	dispatcher = new EventDispatcher();
	view = {
		renderChat: vi.fn(),
		appendMessage: vi.fn(),
	};
	store = {
		state: {
			chat: [],
		},
	};
	controller = new ChatController(gameManager, dispatcher, view, store);
	controller.boot();
});

describe("ChatController -> events", () => {
	beforeEach(() => {
		controller.fillChat = vi.fn();
		controller.onGameWinHandler = vi.fn();
		controller.appendMessage = vi.fn();
		controller.resetChat = vi.fn();
		controller.boot();
	});

	test("GameStartEvent", () => {
		dispatcher.dispatch(new GameStartEvent());
		expect(controller.fillChat).toHaveBeenCalled();
	});

	test("GameWinEvent", () => {
		dispatcher.dispatch(new GameWinEvent(PlayerMark.Cross, [0, 1, 2]));
		expect(controller.onGameWinHandler).toHaveBeenCalledWith(
			expect.objectContaining({
				detail: {
					winner: PlayerMark.Cross,
					combo: [0, 1, 2],
				},
			}),
		);
	});

	test("AIWantsToSpeakEvent", () => {
		const text = "mock-text";
		dispatcher.dispatch(new AIWantsToSpeakEvent(text, text, 1));
		expect(controller.appendMessage).toHaveBeenCalledWith(
			expect.objectContaining({
				detail: {
					speach: text,
					className: text,
					chance: 1,
				},
			}),
		);
	});

	test("GameRestartEvent", () => {
		dispatcher.dispatch(new GameRestartEvent());
		expect(controller.resetChat).toHaveBeenCalled();
	});
});

describe("ChatController.fillChat", () => {
	test("Если есть store.state.chat, то рендерит весь чат", () => {
		const text = "mock-text";
		store.state.chat = [{ message: text, className: text, chance: 1 }];
		dispatcher.dispatch(new GameStartEvent());
		expect(view.renderChat).toHaveBeenCalledWith(
			expect.arrayContaining([{ message: text, className: text, chance: 1 }]),
		);
	});

	test("Если нет store.state.chat, то не рендерит весь чат", () => {
		store.state.chat = null;
		dispatcher.dispatch(new GameStartEvent());
		expect(view.renderChat).not.toHaveBeenCalled();
	});
});

describe("ChatController.onGameWinHandler", () => {
	let spy;
	beforeEach(() => {
		spy = vi.spyOn(dispatcher, "dispatch");
	});

	test("Если сейчас не ход AI, то триггерит AIWantsToSpeakEvent", () => {
		gameManager.isAiMove = false;
		dispatcher.dispatch(new GameWinEvent(PlayerMark.Cross, [0, 1, 2]));
		expect(spy).toHaveBeenCalledWith(expect.any(AIWantsToSpeakEvent));
	});

	test("Если сейчас ход AI, то не триггерит AIWantsToSpeakEvent", () => {
		gameManager.isAiMove = true;
		dispatcher.dispatch(new GameWinEvent(PlayerMark.Cross, [0, 1, 2]));
		expect(spy).not.toHaveBeenCalledWith(expect.any(AIWantsToSpeakEvent));
	});
});

describe("ChatController.appendMessage", () => {
	test("вызывается корректно", () => {
		const text = "mock-text";
		dispatcher.dispatch(new AIWantsToSpeakEvent(text, text, 1));
		expect(view.appendMessage).toHaveBeenCalledWith(
			expect.objectContaining({
				message: text,
				className: text,
				chance: 1,
			}),
		);
	});
});
