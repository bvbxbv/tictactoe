import { appConfigs } from "@configs/appConfigs";
import { Pipe } from "@core/pipeline/Pipe";
import { getRandomItem } from "@utils/helpers";

export class DefensiveMovePipe extends Pipe {
	execute() {
		let move = null;

		for (const combo of this._data.meta._combos) {
			const crossCells = combo.filter((i) => this._data.meta._crossIndexes.includes(i));
			if (crossCells.length !== 2) continue;
			const emptyCell = combo.find((i) => this._data.meta._freeIndexes.includes(i));

			if (emptyCell !== undefined) {
				move = {
					index: emptyCell,
					message: getRandomItem(appConfigs.AI.messages.defense),
				};
				break;
			}
		}

		if (move) this._data.result = move;
	}
}
