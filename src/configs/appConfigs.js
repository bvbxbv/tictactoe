import { UI } from "../ui/elements";
import { sounds } from "./sounds";

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
