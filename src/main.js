import "./index.css";
import fanfareUrl from "./assets/fanfare.wav";

import { Game } from "./core/Game.js";
import { PlayerMark } from "./configs/enums.js";
import { Timer } from "./core/Timer.js";
import { UI } from "./ui/elements.js";
import { dispatcher } from "./core/events/Base/EventDispatcher.js";
import { GameDrawEvent, GameResetEvent, GameWinEvent } from "./core/events/GameEvents.js";
import { BoardView } from "./ui/views/BoardView.js";
import { ModalView } from "./ui/views/ModalView.js";
import { EffectsView } from "./ui/views/EffectsView.js";
import { ScoreView } from "./ui/views/ScoreView.js";

const gameManager = new Game();
const MAX_GAME_TIME = 5000;
const timerCross = new Timer(MAX_GAME_TIME, timerTickHandler);
const timerZero = new Timer(MAX_GAME_TIME, timerTickHandler);
let timer = timerCross;

// FIXME: вьюхи в контроллер.
const boardView = new BoardView({ onCellClick: cellClickHandler });
const modalView = new ModalView({ onClose: resetGame });
const effectsView = new EffectsView({ audio: fanfareUrl });
const scoreView = new ScoreView();

dispatcher.subscribe(GameWinEvent, (e) => {
	showModal(`Игра окончена. Победитель: ${e.detail.winner}`, gameManager.board.cells, e.detail.combo, resetGame);
});

dispatcher.subscribe(GameDrawEvent, () => {
	showModal("Победила дружба!", gameManager.board.cells, null, resetGame);
});

dispatcher.subscribe(GameResetEvent, () => {
	resetGame();
});

function showModal(message, board, winCombo) {
	modalView.update({ message: message, board: board, winCombo: winCombo });
	if (winCombo) {
		effectsView.update();
	}
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
	scoreView.update({ activePlayerMark: PlayerMark.Cross });
	boardView.update({ board: gameManager.board.cells });
}

function cellClickHandler(index) {
	const result = gameManager.makeMove(index);
	if (!result.ok) {
		return;
	}
	scoreView.update({ activePlayerMark: gameManager.whoseMove });
	timer?.stop();
	timer = gameManager.whoseMove === PlayerMark.Cross ? timerCross : timerZero;
	timer.start();
	boardView.update({ board: gameManager.board.cells });
}

timerTickHandler(MAX_GAME_TIME);
