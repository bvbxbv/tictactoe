import { Pipe } from "@core/pipeline/Pipe";

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
					message: "Хрен там. Не так быстро",
				};
				break;
			}
		}

		if (move) this._data.result = move;
	}
}
