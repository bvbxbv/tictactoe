import { ControlsController } from "@controllers/ControlsController";
import { ControllerFactory } from "../Factory";

export class ControlsControllerFactory extends ControllerFactory {
	create(game, dispatcher) {
		return new ControlsController(dispatcher);
	}
}
