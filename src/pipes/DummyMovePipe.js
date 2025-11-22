import { Pipe } from "@core/pipeline/Pipe";
import { getRandomItem } from "@utils/helpers";

export class DummyMovePipe extends Pipe {
	execute() {
		let move;
		if (this._data.meta._freeIndexes.includes(4)) {
			move = {
				index: 4,
				message: "Хи-хи, центр мой!",
			};
		} else {
			move = {
				index: getRandomItem(this._data.meta._freeIndexes),
				message: "Мне в принципе неважно куда ходить. Я в любом случае выиграю",
			};
		}

		this._data.result = move;
	}
}
