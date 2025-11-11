import "./index.css";
import fanfareUrl from "./assets/fanfare.wav";

import JSConfetti from "js-confetti";
import { Game } from "./core/Game.js";
import { GameState, CellState, PlayerMark } from "./configs/enums.js";
import { Timer } from "./core/Timer.js";
import { UI } from "./ui/elements.js";

const gameManager = new Game();
const SCORE_ITEM_ACTIVE = "active-score-item";
const SCORE_ITEM_INACTIVE = "inactive-score-item";
const MAX_GAME_TIME = 5000;
const timerCross = new Timer(MAX_GAME_TIME, timerTickHandler);
const timerZero = new Timer(MAX_GAME_TIME, timerTickHandler);
let timer = timerCross;
const jsConfetti = new JSConfetti();

function showModal(message, board, winCombo, onClose) {
	UI.modal.board.innerHTML = "";
	board.forEach((cell, index) => {
		const htmlClass = winCombo?.includes(index) ? "cell-win" : "";
		UI.modal.board.innerHTML += `
			<div class="cell ${htmlClass}">${cell}</div>
		`;
	});
	UI.modal.message.innerText = message;
	UI.modal.body.classList.remove("hidden");
	if (winCombo) {
		jsConfetti.addConfetti();
		const audio = new Audio(fanfareUrl);
		audio.play();
	}
	UI.modal.button.onclick = () => {
		UI.modal.body.classList.add("hidden");
		onClose?.();
	};
}

function timerTickHandler(ms) {
	const seconds = Math.floor(ms / 1000);
	const milliseconds = ms % 1000;
	UI.timerDisplay.innerText = `${String(seconds).padStart(2, "0")}:${String(milliseconds).padStart(3, "0")}`;
}

function resetGame() {
	gameManager.reset();
	timerCross.reset();
	timerZero.reset();
	timer = null;
	setActiveScoreItem(UI.score.cross);
	UI.cells.forEach((cell) => (cell.innerHTML = CellState.Empty));
}

function setActiveScoreItem(activeEl = null) {
	[UI.score.cross, UI.score.zero].forEach((item) => {
		const isActive = item === activeEl;
		item.classList.toggle(SCORE_ITEM_ACTIVE, isActive);
		item.classList.toggle(SCORE_ITEM_INACTIVE, !isActive);
	});
}

function cellClickHandler(cell, index) {
	const result = gameManager.makeMove(index);
	if (!result.ok) {
		return;
	}
	const scoreItemToHighlight = gameManager.whoseMove === PlayerMark.Cross ? UI.score.cross : UI.score.zero;
	setActiveScoreItem(scoreItemToHighlight);
	timer?.stop();
	timer = gameManager.whoseMove === PlayerMark.Cross ? timerCross : timerZero;
	timer.start();
	cell.innerText = result.value;

	const outcome = gameManager.checkWinner();
	if (outcome.status !== GameState.Playing) {
		const message = outcome.status === GameState.Draw ? "Победила дружба!" : `Игра окончена. Победитель: ${outcome.winner}`;
		showModal(message, gameManager.board.cells, outcome.combo, resetGame);
	}
}

timerTickHandler(MAX_GAME_TIME);
UI.cells.forEach((cell, index) =>
	cell.addEventListener("click", () => {
		cellClickHandler(cell, index);
	})
);
