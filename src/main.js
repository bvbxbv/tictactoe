import "./index.css";

import { Game } from "./core/Game.js";
import { getScoreController } from "./controllers/ScoreController.js";
import { getModalController } from "./controllers/ModalController.js";
import { getEffectsController } from "./controllers/EffectsController.js";
import { getTimerController } from "./controllers/TimerController.js";
import { App } from "./core/App.js";

class MainContext {}

const gameManager = new Game();

const app = new App(gameManager);
app.boot();

const scoreController = getScoreController(gameManager);
const modalController = getModalController(gameManager);
const effectsController = getEffectsController();
const timerController = getTimerController(gameManager);

const context = new MainContext();
