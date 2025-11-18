import { logAction } from "@utils/helpers";

export class ModalView {
	#onClose;
	#cells;
	#elements;

	constructor({ elements, onClose }) {
		this.#elements = elements;
		this.#onClose = onClose;
		this.#cells = this.#elements.board.querySelectorAll(".cell");
		this.#bindListeners();
	}

	update({ message, board, winCombo }) {
		this.#elements.title.innerText = message;

		this.#cells.forEach((cell, index) => {
			let cellClass = "cell";
			if (winCombo?.includes(index)) {
				cellClass += " cell-win";
			}
			cell.className = cellClass;
			cell.innerText = board[index];
		});

		this.#elements.body.classList.remove("hidden");
	}

	#bindListeners() {
		const modalResetButtonClick = () => {
			logAction(this, modalResetButtonClick);
			this.#elements.body.classList.add("hidden");
			this.#onClose?.();
		};

		this.#elements.button.onclick = modalResetButtonClick;
	}

	setOnClose(onClose) {
		this.#onClose = onClose;
	}
}
