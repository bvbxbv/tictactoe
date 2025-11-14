import "./index.css";

import { Game } from "./core/Game.js";
import { getBoardController } from "./controllers/BoardController.js";
import { getScoreController } from "./controllers/ScoreController.js";
import { getModalController } from "./controllers/ModalController.js";
import { getEffectsController } from "./controllers/EffectsController.js";
import { getTimerController } from "./controllers/TimerController.js";

class MainContext {}

const gameManager = new Game();

const boardController = getBoardController(gameManager, gameManager.board);
const scoreController = getScoreController(gameManager);
const modalController = getModalController(gameManager);
const effectsController = getEffectsController();
const timerController = getTimerController(gameManager);

const context = new MainContext();
