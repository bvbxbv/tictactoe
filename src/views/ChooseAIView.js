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

		this.#chooseModalDOM.content.innerHTML += `	<button class="ai-card group cursor-pointer" data-ai="random">
						<span class="text-5xl text-gray-800 dark:text-white">?</span>
						<p class="mt-3 text-lg font-bold text-gray-800 dark:text-white">
							Мне повезет!
						</p>
					</button>`;
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
