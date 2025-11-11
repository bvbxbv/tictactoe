export class GameEvent extends Event {
	#type;
	constructor(type, detail) {
		super(type);
		this.#type = type;
		this.detail = detail;
	}

	get eventName() {
		return this.#type;
	}
}
