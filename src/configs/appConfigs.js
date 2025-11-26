import { UI } from "@configs/dom";
import { sounds } from "@configs/sounds";
import { ai } from "./ai";
import { audio } from "./audio";

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
	jsConfetti: {
		emojisPresets: {
			aiWin: [
				["🤡", "💀", "☠️", "😵", "😈"],
				["🫠", "🤦", "😒", "📉", "👎"],
				["🤖", "😈", "🫵", "💀"],
				["❌", "📉", "💀"],
			],
			aiLoose: [
				["🔥", "💥", "⚡", "😎"],
				["✨", "🌟", "🎉", "😌"],
				["💫", "🌈", "💥", "⭐", "🎆"],
				["😎", "🤙", "👌", "🤯"],
			],
		},
	},
	theme: {
		isDark: false,
		toggle() {
			this.isDark = !this.isDark;
		},
	},
	audio: audio,
	UI: UI,
	AI: ai,
	sounds: sounds,
});
