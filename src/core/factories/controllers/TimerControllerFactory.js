import { TimerController } from "@controllers/TimerController";
import { ControllerFactory } from "@factories/Factory";

export class TimerControllerFactory extends ControllerFactory {
	create(view) {
		return new TimerController(this.gameManager, this.dispatcher, view, this.store);
	}
}
