import { ControlsController } from "@controllers/ControlsController";
import { ControllerFactory } from "../Factory";

export class ControlsControllerFactory extends ControllerFactory {
	create(gameManager, dispatcher, view) {
		return new ControlsController(gameManager, dispatcher, view, this.store);
	}
}
