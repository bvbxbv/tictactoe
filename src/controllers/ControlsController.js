import { appConfigs } from "@configs/appConfigs";
import { CellState } from "@configs/enums";
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
	}

	boot() {}

	onRestartGameHandler() {
		logHandler(this, GameResetEvent);
		this.#dispatcher.dispatch(new GameResetEvent());
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
	}

	onOpenMenuHandler() {}
}
