import JSConfetti from "js-confetti";

export class EffectsView {
	#audio;
	#jsConfetti;

	constructor({ audio }) {
		this.#audio = new Audio(audio);
		this.#jsConfetti = new JSConfetti();
		this.#bindListeners();
	}

	update() {
		this.#jsConfetti.addConfetti();
		this.#audio.play();
	}

	#bindListeners() {}
}
