import { appConfigs } from "@configs/appConfigs";
import { GameResetEvent } from "@core/events/GameEvents";
import { logHandler } from "@utils/helpers";

export class ControlsController {
	#dispatcher;
	#view;
	constructor(dispatcher, view) {
		this.#dispatcher = dispatcher;
		this.#view = view;
	}

	boot() {
		this.#subscribe();
	}

	onRestartGameHandler() {
		logHandler(this, GameResetEvent);
		this.#dispatcher.dispatch(new GameResetEvent());
	}

	onToggleVolumeHandler() {
		appConfigs.audio.toggle();
		this.#view.changeVolumeIconFrom({ isMuted: appConfigs.audio.muted });
	}

	onSwitchColorThemeHandler() {}
	onGiveUpHandler() {}
	onOpenMenuHandler() {}
	#subscribe() {}
}
