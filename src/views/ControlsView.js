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

	toggleAppTheme({ documentElement }) {
		documentElement.classList.toggle("dark");
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
	}
}
