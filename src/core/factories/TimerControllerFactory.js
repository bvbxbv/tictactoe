import { TimerController } from "../../controllers/TimerController";
import { ControllerFactory } from "./Factory";

export class TimerControllerFactory extends ControllerFactory {
	create(view) {
		return new TimerController({
			gameManager: this.gameManager,
			dispatcher: this.dispatcher,
			view: view,
		});
	}
}
