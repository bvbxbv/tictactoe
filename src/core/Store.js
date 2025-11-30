import { appConfigs } from "@configs/appConfigs";
import { CellState, PlayerMark } from "@configs/enums";
import { getRandomItem } from "@utils/helpers";
import { BoardUpdatedEvent } from "./events/BoardEvents";
import { AppThemeChangedEvent, SoundStateChangedEvent } from "./events/ControlEvents";
import {
	GameDrawEvent,
	GameRestartEvent,
	GameStartEvent,
	GameSurrendEvent,
	GameWinEvent,
} from "./events/GameEvents";
import { AIChangedEvent, AIWantsToSpeakEvent, PlayerChangedEvent } from "./events/PlayerEvents";
import { ScoreChangedEvent } from "./events/ScoreEvents";

export class Store {
	#dispatcher;
	#state;

	constructor({ dispatcher }) {
		this.#dispatcher = dispatcher;
		this.#state = this.loadFromLocalStorage() || {
			board: Array(9).fill(CellState.Empty),
			theme: {
				scheme: "light",
			},
			score: {
				cross: 0,
				zero: 0,
			},
			winner: {
				cross: false,
				zero: false,
				combo: null,
			},
			sound: {
				muted: false,
			},
			chat: [],
			aiName: null,
		};

		this.#subscribe();
	}

	#subscribe() {
		this.#dispatcher.subscribe(ScoreChangedEvent, this.saveScore.bind(this));
		this.#dispatcher.subscribe(BoardUpdatedEvent, this.saveBoard.bind(this));
		this.#dispatcher.subscribe(SoundStateChangedEvent, this.saveSoundState.bind(this));
		this.#dispatcher.subscribe(AppThemeChangedEvent, this.saveTheme.bind(this));
		this.#dispatcher.subscribe(AIWantsToSpeakEvent, this.saveChat.bind(this));
		this.#dispatcher.subscribe(AIChangedEvent, this.saveAIPerson.bind(this));
		this.#dispatcher.subscribe(PlayerChangedEvent, this.saveActivePlayerMark.bind(this));
		this.#dispatcher.subscribe(GameWinEvent, this.saveWinner.bind(this));
		this.#dispatcher.subscribe(GameDrawEvent, this.resetWinner.bind(this));
		this.#dispatcher.subscribe(GameSurrendEvent, this.resetWinner.bind(this));
		this.#dispatcher.subscribe(GameRestartEvent, this.resetChat.bind(this));
		this.#dispatcher.subscribe(GameStartEvent, this.onGameStartHandler.bind(this));
	}

	onGameStartHandler() {
		if (this.#state.aiName === "random") {
			this.#state.aiName = getRandomItem(appConfigs.AI.nicknames);
			this.#updateStorage();
		}
	}

	resetChat() {
		this.#state.chat = [];
		this.#updateStorage();
	}

	saveAIPerson(e) {
		if (e.detail.nickname === "random") {
			this.#state.aiName = getRandomItem(appConfigs.AI.nicknames);
		} else {
			this.#state.aiName = e.detail.nickname;
		}
		this.#updateStorage();
	}

	resetWinner() {
		this.#state.winner = {
			cross: false,
			zero: false,
			combo: null,
		};
		this.#updateStorage();
	}

	saveActivePlayerMark(e) {
		this.#state.player = {
			...this.#state.player,
			activePlayerMark: e.detail.activePlayerMark,
		};
		this.#updateStorage();
	}

	saveChat(e) {
		this.#state.chat.push({
			nickname: e.detail.nickname,
			message: e.detail.speach,
			className: e.detail.className,
			chance: e.detail.chance,
		});
		if (this.#state.chat.length > 20) {
			this.#state.chat = this.#state.chat.slice(-20);
		}
		this.#updateStorage();
	}

	saveWinner(e) {
		this.#state.winner = {
			cross: e.detail.winner === PlayerMark.Cross,
			zero: e.detail.winner === PlayerMark.Zero,
			combo: e.detail.combo,
		};
	}

	saveTheme(e) {
		this.#state.theme = {
			scheme: e.detail.theme,
		};
		this.#updateStorage();
	}

	saveSoundState(e) {
		this.#state.sound = {
			muted: e.detail.muted,
		};
		this.#updateStorage();
	}

	saveBoard(e) {
		this.#state.board = e.detail.board;
		this.#updateStorage();
	}

	saveScore(e) {
		this.#state.score = {
			cross: e.detail.cross,
			zero: e.detail.zero,
		};

		this.#updateStorage();
	}

	set(newState) {
		this.#state = newState;
		this.#updateStorage();
	}

	#updateStorage() {
		localStorage.state = JSON.stringify(this.#state);
	}

	get state() {
		return this.#state;
	}

	loadFromLocalStorage() {
		const state = localStorage.state;
		return state ? JSON.parse(state) : null;
	}
}
