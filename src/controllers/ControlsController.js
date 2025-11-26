import { GameResetEvent } from "@core/events/GameEvents";
import { logHandler } from "@utils/helpers";

export class ControlsController {
	#dispatcher;

	constructor(dispatcher) {
		this.#dispatcher = dispatcher;
	}

	boot() {
		this.#subscribe();
	}

	onRestartGameHandler() {
		logHandler(this, GameResetEvent);
		this.#dispatcher.dispatch(new GameResetEvent());
	}

	onToggleVolumeHandler() {}

	onSwitchColorThemeHandler() {}
	onGiveUpHandler() {}
	onOpenMenuHandler() {}
	#subscribe() {}
}
