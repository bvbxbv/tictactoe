import JSConfetti from "js-confetti";

export class EffectsView {
	#audio;
	#jsConfetti;

	constructor({ audio }) {
		this.#audio = new Audio(audio);
		this.#jsConfetti = new JSConfetti();
	}

	update() {
		this.#jsConfetti.addConfetti();
		this.#audio.play();
	}
}
