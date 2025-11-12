import { UI } from "../elements";
import { CellState } from "../../configs/enums";
import { logAction } from "../../utils/helpers";

export class BoardView {
	#cells;
	#onCellClick;
	constructor({ onCellClick }) {
		this.#cells = UI.board.cells;
		this.#onCellClick = onCellClick;
		this.#cells.forEach((cell, index) => {
			cell.dataset.index = index;
		});
		this.#bindListeners();
	}

	update({ board }) {
		this.#cells.forEach((cell, index) => {
			cell.innerText = board[index];
			cell.disabled = board[index] !== CellState.Empty;
		});
	}

	#bindListeners() {
		const boardEl = UI.board.root;
		boardEl.addEventListener("click", (e) => {
			const cell = e.target.closest(".cell");
			if (!cell) return;
			const index = Number(cell.dataset.index);
			logAction(this, { name: "CellClick" }, { index });
			this.#onCellClick(index);
		});
	}
}
