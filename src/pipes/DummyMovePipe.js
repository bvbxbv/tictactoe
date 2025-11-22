import { appConfigs } from "@configs/appConfigs";
import { Pipe } from "@core/pipeline/Pipe";
import { getRandomItem } from "@utils/helpers";

export class DummyMovePipe extends Pipe {
	execute() {
		let move;
		if (this._data.meta._freeIndexes.includes(4)) {
			move = {
				index: 4,
				message: getRandomItem(appConfigs.AI.messages.center),
			};
		} else {
			move = {
				index: getRandomItem(this._data.meta._freeIndexes),
				message: getRandomItem(appConfigs.AI.messages.random),
			};
		}

		this._data.result = move;
	}
}
