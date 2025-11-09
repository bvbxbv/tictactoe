import "./index.css";

import { Game, cellState, checkWinnerResult, player } from "./Game.js";
import { Timer } from "./Timer.js";

const gameManager = new Game();
const cells = document.querySelectorAll(".cell");
const timerDisplay = document.querySelector(".timer>.__content");

function timerTickHandler(ms) {
	const seconds = Math.floor(ms / 1000);
	const milliseconds = ms % 1000;
	timerDisplay.innerText = `${String(seconds).padStart(2, "0")}:${String(milliseconds).padStart(3, "0")}`;
}

const timerCross = new Timer(5000, timerTickHandler);
const timerZero = new Timer(5000, timerTickHandler);
let timer = null;

function resetGridContent() {
	gameManager.reset();
	timerCross.reset();
	timerZero.reset();
	timer = null;
	cells.forEach((cell) => (cell.innerHTML = cellState.Empty));
}

function cellClickHandler(cell, index) {
	const result = gameManager.makeMove(index);
	if (!result.success) {
		return;
	}

	timer?.stop();
	timer = gameManager.whoseMove === player.Cross ? timerCross : timerZero;
	timer.start();
	cell.innerText = result.currentPlayer;

	const outcome = gameManager.checkWinner();

	if (outcome.status !== checkWinnerResult.playing) {
		alert(outcome.status === checkWinnerResult.draw ? "Победила дружба" : `Игра окончена. Победитель: ${outcome.winner}`);
		resetGridContent();
	}
}

cells.forEach((cell, index) =>
	cell.addEventListener("click", () => {
		cellClickHandler(cell, index);
	})
);
