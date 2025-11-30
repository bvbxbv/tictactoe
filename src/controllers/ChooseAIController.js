import { AIChangedEvent } from "@core/events/PlayerEvents";

export class ChooseAIController {
	#dispatcher;
	#view;

	constructor(gameManager, dispatcher, view) {
		this.#dispatcher = dispatcher;
		this.#view = view;
	}

	boot() {
		this.#subscribe();

		this.#view.setCardClickHandler((nickname) => {
			this.chooseAI(nickname);
		});
	}

	#subscribe() {}

	chooseAI(nickname) {
		this.#dispatcher.dispatch(new AIChangedEvent(nickname));
	}
}
