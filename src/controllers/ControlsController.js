import { appConfigs } from "@configs/appConfigs";
import { CellState, PlayerMark } from "@configs/enums";
import { AppThemeChangedEvent, SoundStateChangedEvent } from "@core/events/ControlEvents";
import {
	GameResetEvent,
	GameRestartEvent,
	GameStartEvent,
	GameSurrendEvent,
} from "@core/events/GameEvents";
import { logHandler } from "@utils/helpers";

export class ControlsController {
	#dispatcher;
	#view;
	#gameManager;
	#store;

	constructor(gameManager, dispatcher, view, store) {
		this.#gameManager = gameManager;
		this.#dispatcher = dispatcher;
		this.#view = view;
		this.#store = store;
	}

	boot() {
		this.#subscribe();
	}

	#subscribe() {
		this.#dispatcher.subscribe(GameStartEvent, this.onGameStartHandler.bind(this));
	}

	onGameStartHandler() {
		let theme;
		const themeState = this.#store.state.theme;
		if (themeState !== null && themeState !== undefined) {
			theme = themeState.scheme;
		} else {
			theme = appConfigs.theme.isDark ? "dark" : "light";
		}
		const toAdd = theme === "dark" ? "dark" : "light";
		const toRemove = theme === "dark" ? "light" : "dark";
		this.#view.setAppTheme({
			documentElement: appConfigs.UI.mount,
			toAdd: toAdd,
			toRemove: toRemove,
			isDark: toAdd !== "dark",
		});

		if (this.#store.state.sound.muted) {
			const isMuted = this.#store.state.sound.muted;
			this.#view.changeVolumeIconFrom({ isMuted: isMuted });
			appConfigs.audio.muted = isMuted;
		}
	}

	onRestartGameHandler() {
		logHandler(this, GameResetEvent);
		this.#dispatcher.dispatch(new GameResetEvent());
		this.#dispatcher.dispatch(new GameRestartEvent());
	}

	onToggleVolumeHandler() {
		appConfigs.audio.toggle();
		this.#dispatcher.dispatch(new SoundStateChangedEvent(appConfigs.audio.muted));
		this.#view.changeVolumeIconFrom({ isMuted: appConfigs.audio.muted });
	}

	onSwitchColorThemeHandler() {
		const toAdd = appConfigs.UI.mount.classList.contains("dark") ? "light" : "dark";
		const toRemove = toAdd === "dark" ? "light" : "dark";
		this.#dispatcher.dispatch(new AppThemeChangedEvent(toAdd));
		this.#view.setAppTheme({
			documentElement: appConfigs.UI.mount,
			toAdd: toAdd,
			toRemove: toRemove,
			isDark: toAdd !== "dark",
		});
	}

	onOpenAIChooseHandler() {
		this.#view.openAIChooseModal();
	}

	onGiveUpHandler() {
		if (this.#gameManager.board.serialize().cells.every((c) => c === CellState.Empty)) {
			this.#dispatcher.dispatch(
				new GameSurrendEvent(appConfigs.text.modal.giveUp.onEmptyBoard),
			);
		} else {
			this.#dispatcher.dispatch(new GameSurrendEvent(appConfigs.text.modal.giveUp.default));
		}
		this.#gameManager.surrend(PlayerMark.Cross);
	}
}
