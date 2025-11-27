import { appConfigs } from "@configs/appConfigs";

export class ControlsView {
	#controlsDOM;
	#handlers = {
		restartGameButton: null,
		toggleVolumeButton: null,
		switchColorThemeButton: null,
		giveUpButton: null,
		openMenuButton: null,
	};

	constructor({ controlsDOM }) {
		this.#controlsDOM = controlsDOM;
		this.#bindListeners();
	}

	changeVolumeIconFrom({ isMuted }) {
		const { unmutedIcon, mutedIcon } = this.#controlsDOM.icons;

		if (isMuted) {
			unmutedIcon.classList.add("hidden");
			mutedIcon.classList.remove("hidden");
		} else {
			unmutedIcon.classList.remove("hidden");
			mutedIcon.classList.add("hidden");
		}
	}

	setAppTheme({ documentElement, toAdd, toRemove }) {
		documentElement.classList.remove(toRemove);
		documentElement.classList.add(toAdd);
	}

	setOnRestartGameButtonClick(handler) {
		this.#handlers.restartGameButton = handler;
	}

	setOnToggleVolumeButtonClick(handler) {
		this.#handlers.toggleVolumeButton = handler;
	}
	setOnSwitchColorThemeButtonClick(handler) {
		this.#handlers.switchColorThemeButton = handler;
	}

	setOnGiveUpButtonClick(handler) {
		this.#handlers.giveUpButton = handler;
	}

	setOnOpenMenuButtonClick(handler) {
		this.#handlers.openMenuButton = handler;
	}

	#bindListeners() {
		const keys = Object.keys(this.#handlers);
		for (const key of keys) {
			this.#controlsDOM[key].addEventListener("click", () => {
				this.#handlers[key]?.();
			});
		}

		appConfigs.UI.chat.openButton.addEventListener("click", () => {
			appConfigs.UI.chat.root.classList.remove("-translate-x-full");
		});

		appConfigs.UI.chat.closeButton.addEventListener("click", () => {
			appConfigs.UI.chat.root.classList.add("-translate-x-full");
		});
	}
}
