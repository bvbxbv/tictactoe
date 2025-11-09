import "./index.css";

import { Game, cellState, checkWinnerResult } from "./Game.js";

const gameManager = new Game();
const cells = document.querySelectorAll(".cell");

function resetGridContent() {
	gameManager.reset();
	cells.forEach((cell) => (cell.innerHTML = cellState.Empty));
}

function cellClickHandler(cell, index) {
	const result = gameManager.makeMove(index);
	if (!result.success) {
		return;
	}

	cell.innerText = result.currentPlayer;

	const outcome = gameManager.checkWinner();

	if (outcome.status === checkWinnerResult.win) {
		alert(`Игра окончена. Победитель: ${outcome.winner}`);
		resetGridContent();
		return;
	}

	if (outcome.status === checkWinnerResult.draw) {
		alert("Победила дружба");
		resetGridContent();
		return;
	}

	if (outcome.status === checkWinnerResult.playing) {
		return;
	}
}

cells.forEach((cell, index) =>
	cell.addEventListener("click", () => {
		// console.log(gameManager.checkWinner());
		cellClickHandler(cell, index);
	})
);
