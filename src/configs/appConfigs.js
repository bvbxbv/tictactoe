import { UI } from "@configs/dom";
import { sounds } from "@configs/sounds";

export const appConfigs = Object.freeze({
	timer: {
		startTime: 5000,
	},
	player: {
		cross: {
			char: "X",
		},
		zero: {
			char: "O",
		},
	},
	UI: UI,
	sounds: sounds,
});
