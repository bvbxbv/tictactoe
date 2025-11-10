import "./index.css";
import fanfareUrl from "./assets/fanfare.wav";

import JSConfetti from "js-confetti";
import { Game, cellState, checkWinnerResult, player } from "./core/Game.js";
import { Timer } from "./core/Timer.js";

const gameManager = new Game();
const cells = document.querySelectorAll(".cell");
const timerDisplay = document.querySelector(".timer>.__content");
const SCORE_ITEM_ACTIVE = "active-score-item";
const SCORE_ITEM_INACTIVE = "inactive-score-item";
const MAX_GAME_TIME = 5000;
const timerCross = new Timer(MAX_GAME_TIME, timerTickHandler);
const timerZero = new Timer(MAX_GAME_TIME, timerTickHandler);
let timer = timerCross;
const modal = document.getElementById("modal");
const modalMessage = document.getElementById("modal-message");
const modalBtn = document.getElementById("modal-btn");
const jsConfetti = new JSConfetti();
const score = {
	cross: document.getElementById("score-cross-player"),
	zero: document.getElementById("score-zero-player"),
};

function showModal(message, board, winCombo, onClose) {
	const miniBoard = document.getElementById("mini-board");
	miniBoard.innerHTML = "";
	board.forEach((cell, index) => {
		const htmlClass = winCombo?.includes(index) ? "cell-win" : "";
		miniBoard.innerHTML += `
			<div class="cell ${htmlClass}">${cell}</div>
		`;
	});
	modalMessage.innerText = message;
	modal.classList.remove("hidden");
	if (winCombo) {
		jsConfetti.addConfetti();
		const audio = new Audio(fanfareUrl);
		audio.play();
	}
	modalBtn.onclick = () => {
		modal.classList.add("hidden");
		onClose?.();
	};
}

function timerTickHandler(ms) {
	const seconds = Math.floor(ms / 1000);
	const milliseconds = ms % 1000;
	timerDisplay.innerText = `${String(seconds).padStart(2, "0")}:${String(milliseconds).padStart(3, "0")}`;
}

function resetGame() {
	gameManager.reset();
	timerCross.reset();
	timerZero.reset();
	timer = null;
	setActiveScoreItem(score.cross);
	cells.forEach((cell) => (cell.innerHTML = cellState.Empty));
}

function setActiveScoreItem(activeEl = null) {
	const items = [score.cross, score.zero];

	items.forEach((item) => {
		const isActive = item === activeEl;
		item.classList.toggle(SCORE_ITEM_ACTIVE, isActive);
		item.classList.toggle(SCORE_ITEM_INACTIVE, !isActive);
	});
}

function cellClickHandler(cell, index) {
	const result = gameManager.makeMove(index);
	if (!result.success) {
		return;
	}
	const scoreItemToHighlight = gameManager.whoseMove === player.Cross ? score.cross : score.zero;
	setActiveScoreItem(scoreItemToHighlight);
	timer?.stop();
	timer = gameManager.whoseMove === player.Cross ? timerCross : timerZero;
	timer.start();
	cell.innerText = result.currentPlayer;

	const outcome = gameManager.checkWinner();
	if (outcome.status !== checkWinnerResult.playing) {
		const message = outcome.status === checkWinnerResult.draw ? "Победила дружба!" : `Игра окончена. Победитель: ${outcome.winner}`;
		showModal(message, gameManager.board, outcome.combo, resetGame);
	}
}

timerTickHandler(MAX_GAME_TIME);
cells.forEach((cell, index) =>
	cell.addEventListener("click", () => {
		cellClickHandler(cell, index);
	})
);
