import { appConfigs } from "@configs/appConfigs";
import { CellState } from "@configs/enums";
import { Pipe } from "@core/pipeline/Pipe";
import { getRandomItem } from "@utils/helpers";

export class WinningMovePipe extends Pipe {
	execute() {
		let move = null;

		for (const combo of this._data.meta._combos) {
			const [a, b, c] = combo;
			const items = [this._data.start[a], this._data.start[b], this._data.start[c]];

			if (items.includes(CellState.Cross)) continue;

			const empties = items
				.map((v, i) => (v === CellState.Empty ? i : -1))
				.filter((i) => i !== -1);

			if (empties.length === 1) {
				move = {
					index: combo[empties[0]],
					message: getRandomItem(appConfigs.AI.messages[this._data.meta._aiName].win),
				};
				break;
			}
		}

		if (move) this._data.result = move;
	}
}
