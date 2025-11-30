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
			const item = appConfigs.UI.chooseModal.getOption(
				images[nickname.toLowerCase()],
				nickname.toLowerCase(),
				appConfigs.AI.meta[nickname].fullName,
				appConfigs.AI.meta[nickname].description,
				appConfigs.AI.meta[nickname].color,
				appConfigs.AI.meta[nickname].adult,
			);
			this.#chooseModalDOM.content.appendChild(item);
		});

		this.#chooseModalDOM.content.appendChild(appConfigs.UI.chooseModal.emptyOption);
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
