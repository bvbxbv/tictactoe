import { appConfigs } from "@configs/appConfigs";
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

	playSound(sound) {
		this.#audio = new Audio(sound);
		if (appConfigs.audio.muted) {
			this.#audio.muted = true;
		}
		this.#audio.play();
	}
}
