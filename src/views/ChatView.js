import { createChatMessage } from "@utils/helpers";

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

	appendMessage(phrase) {
		this.#appendMessageElement(phrase);
	}

	#appendMessageElement(phrase) {
		const msg = createChatMessage(phrase.nickname, phrase.message, { msg: phrase.className });
		this.#chatDOM.appendChild(msg);
	}
}
