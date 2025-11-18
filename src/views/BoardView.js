import { CellState } from "@configs/enums";
import { logAction } from "@utils/helpers";

export class BoardView {
	#cells;
	#onCellClick = null;
	#boardDOM;

	constructor({ boardDOM, onCellClick }) {
		this.#boardDOM = boardDOM;
		this.#cells = this.#boardDOM.cells;
		this.#onCellClick = onCellClick;
		this.#cells.forEach((cell, index) => {
			cell.dataset.index = index;
		});
		this.#bindListeners();
	}

	setOnCellClick(handler) {
		this.#onCellClick = handler;
	}

	update({ board }) {
		this.#cells.forEach((cell, index) => {
			cell.innerText = board[index];
			cell.disabled = board[index] !== CellState.Empty;
		});
	}

	#bindListeners() {
		const boardEl = this.#boardDOM.root;
		boardEl.addEventListener("click", (e) => {
			const cell = e.target.closest(".cell");
			if (!cell) return;
			const index = Number(cell.dataset.index);
			logAction(this, { name: "CellClick" }, { index });
			this.#onCellClick?.(index);
		});
	}
}
