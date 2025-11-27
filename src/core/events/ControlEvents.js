import { GameEvent } from "@core/events/Base/GameEvent";

export class SoundStateChangedEvent extends GameEvent {
	constructor(muted) {
		super("soundstate@changed", { muted });
	}
}

export class AppThemeChangedEvent extends GameEvent {
	constructor(theme) {
		super("theme@changed", { theme });
	}
}
