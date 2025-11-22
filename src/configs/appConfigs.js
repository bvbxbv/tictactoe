import { UI } from "@configs/dom";
import { sounds } from "@configs/sounds";
import { ai } from "./ai";

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
	AI: ai,
	sounds: sounds,
});
