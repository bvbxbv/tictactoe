import { appConfigs } from "@configs/appConfigs";
import { images } from "@configs/images";

export class ChooseAIView {
	#chooseModalDOM;
	#cardClickHandler;

	constructor(chatDOM) {
		this.#chooseModalDOM = chatDOM;

		this.#fillDom();
		this.#bindListeners();
	}

	setCardClickHandler(handler) {
		this.#cardClickHandler = handler;
	}

	#fillDom() {
		appConfigs.AI.nicknames.forEach((nickname) => {
			this.#chooseModalDOM.content.innerHTML += appConfigs.UI.chooseModal.getOption(
				images[nickname.toLowerCase()],
				nickname,
				"description",
			);
		});
	}

	#bindListeners() {
		document.querySelectorAll(".ai-card").forEach((card) => {
			card.addEventListener("click", (e) => {
				this.#cardClickHandler?.(e.currentTarget.dataset.ai);
				appConfigs.UI.chooseModal.root.classList.toggle("hidden");
			});
		});
	}
}
