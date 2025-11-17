import "./index.css";

import { getModalController } from "./controllers/ModalController.js";
import { getTimerController } from "./controllers/TimerController.js";
import { App } from "./core/App.js";
import { EventDispatcher } from "./core/events/Base/EventDispatcher.js";
import { Game } from "./core/Game.js";

class MainContext {}

const dispatcher = new EventDispatcher();
const gameManager = new Game(dispatcher);
const app = new App(gameManager, dispatcher);
app.boot();

const modalController = getModalController({ gameManager: gameManager, dispatcher: dispatcher });
const timerController = getTimerController({ gameManager: gameManager, dispatcher: dispatcher });
