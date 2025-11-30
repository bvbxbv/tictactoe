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
	nicknames: ["postaldude", "heizenberg", "hannibal", "tylerdurden", "tywinlanister"],
	meta: {
		postaldude: {
			fullName: "Чувак из Postal",
			description: "Подпиши чёртову петицию",
			adult: true,
			color: "text-red-600",
		},

		heizenberg: {
			fullName: "Хайзенберг",
			description: "Я не в опасности. Я и есть опасность.",
			adult: false,
			color: "text-cyan-500",
		},

		hannibal: {
			fullName: "Доктор Ганнибал Лектер",
			description: "Приятного аппетита",
			adult: false,
			color: "text-amber-700",
		},

		tylerdurden: {
			fullName: "Тайлер Дёрден",
			description: "Ударь меня",
			adult: false,
			color: "text-orange-600",
		},

		tywinlanister: {
			fullName: "Тайвин Ланнистер",
			description: "Ланнистеры всегда платят свои долги",
			adult: false,
			color: "text-yellow-600",
		},
	},
	messages: messages,
});
