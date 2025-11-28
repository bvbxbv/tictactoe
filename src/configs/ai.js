import { messages } from "./replics/messages";

function toMs(s) {
	return s * 1000;
}

export const Style = Object.freeze({
	Sarcasm: "italic",
	Default: "",
});

export const ai = Object.freeze({
	response: {
		delay: {
			min: toMs(0.5),
			max: toMs(1),
		},
	},
	nicknames: ["PostalDude", "Heizenberg", "Hannibal", "TylerDurden", "TywinLanister"],
	messages: messages,
});
