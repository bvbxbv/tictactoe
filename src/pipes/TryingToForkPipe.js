import { Pipe } from "@core/pipeline/Pipe";
import { getRandomItem } from "@utils/helpers";

export class TryingToForkPipe extends Pipe {
	#getOpposite(index) {
		const map = { 1: 7, 7: 1, 3: 5, 5: 3 };
		return map[index] ?? undefined;
	}

	#tryToPutInCorners(message) {
		const corners = [0, 2, 6, 8].filter((i) => this._data.meta._freeIndexes.includes(i));
		return {
			index: getRandomItem(corners),
			message: message,
		};
	}

	#haveEmptyCorners() {
		return this._data.meta._freeIndexes.some((i) => [0, 2, 6, 8].includes(i));
	}

	#haveEmptyOpposites() {
		return this._data.meta._freeIndexes.some((i) => [1, 3, 5, 7].includes(i));
	}

	execute() {
		// console.log("PIPELINE_MARK");
		let move = null;

		if (this._data.meta._zeroIndexes.includes(4) && this.#haveEmptyCorners()) {
			move = this.#tryToPutInCorners("Че думаешь? Норм ход? :)");
		} else if (
			this._data.meta._zeroIndexes.some((i) => [1, 3, 5, 7].includes(i)) &&
			this.#haveEmptyOpposites()
		) {
			const canidates = this._data.meta._zeroIndexes.filter((i) => [1, 3, 5, 7].includes(i));
			move = {
				index: this.#getOpposite(getRandomItem(canidates)),
				message: "Смотри не попадись в мои сети",
			};
		}

		if (move !== null) {
			this._data.result = move;
		}
	}
}
