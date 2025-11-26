import { appConfigs } from "@configs/appConfigs";
import { createChatMessage } from "@utils/helpers";
import JSConfetti from "js-confetti";

export class EffectsView {
	#audio;
	#jsConfetti;

	constructor({ audio }) {
		this.#audio = new Audio(audio);
		this.#jsConfetti = new JSConfetti();
	}

	showWinScreen({ confetti, audioUrl }) {
		this.#jsConfetti.addConfetti(confetti);
		this.playSound(audioUrl);
	}

	showMessageInChat(text, className) {
		const msg = createChatMessage("SayMyName", text, { msg: className });
		// FIXME: dependency
		appConfigs.UI.chat.root.appendChild(msg);
	}

	playSound(sound) {
		this.#audio = new Audio(sound);
		this.#audio.play();
	}
}
