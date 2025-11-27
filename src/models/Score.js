import { PlayerMark } from "@configs/enums";
import { GameRestartEvent, GameStartEvent } from "@core/events/GameEvents";
import { ScoreChangedEvent } from "@core/events/ScoreEvents";
import { ArgumentIsNotPlayerMarkError } from "@errors/scoreErrors";
import { logAction } from "@utils/helpers";

export class Score {
	#score = {
		[PlayerMark.Cross]: 0,
		[PlayerMark.Zero]: 0,
	};
	#dispatcher;
	#store;

	constructor(dispatcher, store) {
		this.#dispatcher = dispatcher;
		this.#store = store;
		this.#dispatcher.subscribe(GameStartEvent, this.onGameStartHandler.bind(this));
		this.#dispatcher.subscribe(GameRestartEvent, this.reset.bind(this));
	}

	onGameStartHandler() {
		if (this.#store.state.score !== null && this.#store.state.score !== undefined) {
			this.#score[PlayerMark.Cross] = this.#store.state.score.cross;
			this.#score[PlayerMark.Zero] = this.#store.state.score.zero;
			const payload = { cross: this.cross, zero: this.zero };
			logAction(this, ScoreChangedEvent, payload);
			this.#dispatcher.dispatch(new ScoreChangedEvent(payload));
		}
	}

	set(state) {
		this.#score = state;
		const payload = { cross: this.cross, zero: this.zero };
		logAction(this, ScoreChangedEvent, payload);
		this.#dispatcher.dispatch(new ScoreChangedEvent(payload));
	}

	win(who) {
		const isPlayer = who === PlayerMark.Cross || who === PlayerMark.Zero;
		if (!isPlayer) {
			throw new ArgumentIsNotPlayerMarkError(who);
		}
		this.#score[who] += 1;
		const payload = { cross: this.cross, zero: this.zero };

		logAction(this, ScoreChangedEvent, payload);
		this.#dispatcher.dispatch(new ScoreChangedEvent(payload));
	}

	loose(who) {
		if (this.#score[who] > 0) {
			this.#score[who] -= 1;
			const payload = { cross: this.cross, zero: this.zero };

			logAction(this, ScoreChangedEvent, payload);
			this.#dispatcher.dispatch(new ScoreChangedEvent(payload));
		}
	}

	reset() {
		this.#score = {
			[PlayerMark.Cross]: 0,
			[PlayerMark.Zero]: 0,
		};

		const payload = { cross: this.cross, zero: this.zero };
		logAction(this, ScoreChangedEvent, payload);
		this.#dispatcher.dispatch(new ScoreChangedEvent(payload));
	}

	get cross() {
		return this.#score[PlayerMark.Cross];
	}

	get zero() {
		return this.#score[PlayerMark.Zero];
	}

	serialize() {
		const toSerialize = {
			cross: this.#score[PlayerMark.Cross],
			zero: this.#score[PlayerMark.Zero],
		};
		return JSON.parse(JSON.stringify(toSerialize));
	}
}
