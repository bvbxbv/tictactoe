import { appConfigs } from "@configs/appConfigs";

export class ChatView {
	#chatDOM;

	constructor(chatDOM) {
		this.#chatDOM = chatDOM;
	}

	renderChat(chat) {
		if (chat.length === 0) {
			this.#chatDOM.innerHTML = "";
		}

		chat.forEach((phrase) => {
			this.#appendMessageElement(phrase);
		});
	}

	createSeparator(nickname) {
		this.#chatDOM.appendChild(appConfigs.UI.chat.separator(nickname));
	}

	appendMessage(phrase) {
		this.#appendMessageElement(phrase);
	}

	#appendMessageElement(phrase) {
		const msg = appConfigs.UI.chat.message(phrase.nickname, phrase.message, {
			nick: appConfigs.AI.meta[phrase.nickname].color,
			msg: phrase.className,
		});
		this.#chatDOM.appendChild(msg);
	}
}
