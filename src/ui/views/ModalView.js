import { logAction } from "../../utils/helpers";
import { UI } from "../elements";

export class ModalView {
	#onClose;
	#cells;

	constructor({ onClose }) {
		this.#onClose = onClose;
		this.#cells = UI.modal.board.querySelectorAll(".cell");
		this.#bindListeners();
	}

	update({ message, board, winCombo }) {
		UI.modal.message.innerText = message;

		this.#cells.forEach((cell, index) => {
			let cellClass = "cell";
			if (winCombo?.includes(index)) {
				cellClass += " cell-win";
			}
			cell.className = cellClass;
			cell.innerText = board[index];
		});

		UI.modal.body.classList.remove("hidden");
	}

	#bindListeners() {
		const modalResetButtonClick = () => {
			logAction(this, modalResetButtonClick);
			UI.modal.body.classList.add("hidden");
			this.#onClose?.();
		};

		UI.modal.button.onclick = modalResetButtonClick;
	}
}
