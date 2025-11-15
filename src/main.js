import "./index.css";

import { Game } from "./core/Game.js";
import { getScoreController } from "./controllers/ScoreController.js";
import { getModalController } from "./controllers/ModalController.js";
import { getEffectsController } from "./controllers/EffectsController.js";
import { getTimerController } from "./controllers/TimerController.js";
import { App } from "./core/App.js";
import { EventDispatcher } from "./core/events/Base/EventDispatcher.js";

class MainContext {}

const dispatcher = new EventDispatcher();
const gameManager = new Game(dispatcher);
const app = new App(gameManager, dispatcher);
app.boot();

const scoreController = getScoreController({ gameManager: gameManager, dispatcher: dispatcher });
const modalController = getModalController({ gameManager: gameManager, dispatcher: dispatcher });
const effectsController = getEffectsController({ dispatcher: dispatcher });
const timerController = getTimerController({ gameManager: gameManager, dispatcher: dispatcher });

const context = new MainContext();
