import { toast } from "@utils/helpers";
import JSConfetti from "js-confetti";

export class EffectsView {
	#audio;
	#jsConfetti;
	// #currentAudioUrl;

	constructor({ audio }) {
		// this.#currentAudioUrl = audio;
		this.#audio = new Audio(audio);
		this.#jsConfetti = new JSConfetti();
	}

	update({ audioUrl }) {
		// this.#currentAudioUrl = audioUrl;
		this.#jsConfetti.addConfetti();
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
