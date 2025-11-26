import { appConfigs } from "@configs/appConfigs";
import { CellState, PlayerMark } from "@configs/enums";
import { GameResetEvent, GameSurrendEvent } from "@core/events/GameEvents";
import { logHandler } from "@utils/helpers";

export class ControlsController {
	#dispatcher;
	#view;
	#gameManager;

	constructor(gameManager, dispatcher, view) {
		this.#gameManager = gameManager;
		this.#dispatcher = dispatcher;
		this.#view = view;
		this.#bindListeners();
	}

	boot() {
		this.#bindListeners();
	}

	onToggleVolumeHandler() {
		appConfigs.audio.toggle();
		this.#view.changeVolumeIconFrom({ isMuted: appConfigs.audio.muted });
	}

	onSwitchColorThemeHandler() {
		this.#view.toggleAppTheme({ documentElement: appConfigs.UI.mount });
	}

	onGiveUpHandler() {
		if (this.#gameManager.board.serialize().cells.every((c) => c === CellState.Empty)) {
			this.#dispatcher.dispatch(new GameSurrendEvent("Пропади все пропадом, да?"));
		} else {
			this.#dispatcher.dispatch(new GameSurrendEvent("Вы сдались"));
		}
		this.#gameManager.surrend(PlayerMark.Cross);
	}

	onOpenMenuHandler() {}

	#bindListeners() {
		appConfigs.UI.chat.openButton.addEventListener("click", () => {
			appConfigs.UI.chat.root.classList.remove("-translate-x-full");
		});

		appConfigs.UI.chat.closeButton.addEventListener("click", () => {
			appConfigs.UI.chat.root.classList.add("-translate-x-full");
		});
	}
}
