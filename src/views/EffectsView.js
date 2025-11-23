import { toast } from "@utils/helpers";
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

	showToast({ text, className, duration }) {
		toast({
			text: text,
			className: className,
			duration: duration,
		});
	}

	playSound(sound) {
		this.#audio = new Audio(sound);
		this.#audio.play();
	}
}
