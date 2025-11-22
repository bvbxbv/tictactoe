import { appConfigs } from "@configs/appConfigs";
import { Pipe } from "@core/pipeline/Pipe";
import { getRandomItem } from "@utils/helpers";

export class TryingToForkPipe extends Pipe {
	#getOpposite(index) {
		const map = { 1: 7, 7: 1, 3: 5, 5: 3 };
		return map[index] ?? undefined;
	}

	execute() {
		const isAnyCornerEmpty = this._data.meta._freeIndexes.some((i) => [0, 2, 6, 8].includes(i));
		const isAnyOppositeEmpty = this._data.meta._freeIndexes.some((i) =>
			[1, 3, 5, 7].includes(i),
		);
		let move = null;

		const free = this._data.meta._zeroIndexes;
		const corners = [0, 2, 6, 8].filter((i) => this._data.meta._freeIndexes.includes(i));
		if (free.includes(4) && corners.length) {
			move = {
				index: getRandomItem(corners),
				message: getRandomItem(appConfigs.AI.messages.fork),
			};
		} else if (free.some((i) => [1, 3, 5, 7].includes(i)) && isAnyOppositeEmpty) {
			const candidates = free.filter((i) => [1, 3, 5, 7].includes(i));
			const validCandidates = candidates.filter(
				(i) => this.#getOpposite(i) !== undefined && free.includes(this.#getOpposite(i)),
			);

			if (validCandidates.length) {
				const choice = getRandomItem(validCandidates);
				move = {
					index: this.#getOpposite(choice),
					message: getRandomItem(appConfigs.AI.messages.fork),
				};
			}
		}
		console.log("TryingToForkPipe", this._data.meta._freeIndexes, move);

		if (move !== null) {
			this._data.result = move;
		}
	}
}
