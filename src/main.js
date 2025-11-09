import "./index.css";

import { Game } from "./Game.js";

const gameManager = new Game();
const cells = document.querySelectorAll(".cell");

function cellClickHandler(cell, index) {
	const isSuccess = gameManager.makeMove(index);
	if (isSuccess) {
		cell.innerText = gameManager.board[index];
	}
}

cells.forEach((cell, index) =>
	cell.addEventListener("click", () => {
		cellClickHandler(cell, index);
	})
);
