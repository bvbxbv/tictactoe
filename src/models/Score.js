import { PlayerMark } from "@configs/enums";
import { ScoreChangedEvent } from "@core/events/ScoreEvents";
import { logAction } from "@utils/helpers";

// FIXME: vitest test
// FIXME: InstanceContainer
// FIXME: Factory
// FIXME: DI
// FIXME: Serialization
// FIXME: load frmo localstorage
export class Score {
	#score;
	#dispatcher;

	constructor(dispatcher) {
		this.#dispatcher = dispatcher;
		this.reset();
	}

	win(who) {
		const isPlayer = who === PlayerMark.Cross || who === PlayerMark.Zero;
		if (!isPlayer) {
			// FIXME: exception
			throw new Error(`${who} is not player`);
		}
		this.#score[who] += 1;
		const payload = { cross: this.cross, zero: this.zero };

		logAction(this, ScoreChangedEvent, payload);
		this.#dispatcher.dispatch(new ScoreChangedEvent(payload));
	}

	reset() {
		this.#score = {
			[PlayerMark.Cross]: 0,
			[PlayerMark.Zero]: 0,
		};
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
