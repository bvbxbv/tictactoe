import "./index.css";
import fanfareUrl from "./assets/fanfare.wav";

import { Game } from "./core/Game.js";
import { PlayerMark } from "./configs/enums.js";
import { Timer } from "./core/Timer.js";
import { UI } from "./ui/elements.js";
import { dispatcher } from "./core/events/Base/EventDispatcher.js";
import { GameDrawEvent, GameResetEvent, GameWinEvent } from "./core/events/GameEvents.js";
import { ModalView } from "./ui/views/ModalView.js";
import { EffectsView } from "./ui/views/EffectsView.js";
import { ScoreView } from "./ui/views/ScoreView.js";
import { getBoardController } from "./controllers/BoardController.js";
import { PlayerMovedEvent } from "./core/events/PlayerEvents.js";
import { BoardResetEvent } from "./core/events/BoardEvents.js";
import { logAction, logHandler } from "./utils/helpers.js";
import { getScoreController } from "./controllers/ScoreController.js";

class MainContext {}

const gameManager = new Game();
const MAX_GAME_TIME = 5000;
const timerCross = new Timer(MAX_GAME_TIME, timerTickHandler);
const timerZero = new Timer(MAX_GAME_TIME, timerTickHandler);
let timer = timerCross;

// FIXME: вьюхи в контроллер.
const modalView = new ModalView({ onClose: resetGame });
const effectsView = new EffectsView({ audio: fanfareUrl });

const boardController = getBoardController(gameManager, gameManager.board);
const scoreController = getScoreController(gameManager);

const context = new MainContext();

function subscribeEvent(event, handler) {
	dispatcher.subscribe(event, (e) => {
		logHandler(context, event, handler, e.detail);
		handler(e);
	});
}

function onGameWin(e) {
	showModal(`Игра окончена. Победитель: ${e.detail.winner}`, gameManager.board.cells, e.detail.combo, resetGame);
}

function onGameDraw() {
	showModal("Победила дружба!", gameManager.board.cells, null, resetGame);
}

function onGameReset() {
	resetGame();
}

function onPlayerMove(e) {
	timer?.stop();
	timer = gameManager.whoseMove === PlayerMark.Cross ? timerCross : timerZero;
	timer.start();
}

subscribeEvent(GameWinEvent, onGameWin);
subscribeEvent(GameDrawEvent, onGameDraw);
subscribeEvent(GameResetEvent, onGameReset);
subscribeEvent(PlayerMovedEvent, onPlayerMove);

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
	logAction(context, BoardResetEvent);
	dispatcher.dispatch(new BoardResetEvent());
}

timerTickHandler(MAX_GAME_TIME);
