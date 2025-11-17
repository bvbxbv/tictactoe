import "./index.css";

import { getTimerController } from "./controllers/TimerController.js";
import { App } from "./core/App.js";
import { EventDispatcher } from "./core/events/Base/EventDispatcher.js";
import { Game } from "./core/Game.js";

const dispatcher = new EventDispatcher();
const gameManager = new Game(dispatcher);
const app = new App(gameManager, dispatcher);
app.boot();

const timerController = getTimerController({ gameManager: gameManager, dispatcher: dispatcher });
