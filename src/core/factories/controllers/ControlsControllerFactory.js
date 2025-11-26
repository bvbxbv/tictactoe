import { ControlsController } from "@controllers/ControlsController";
import { ControllerFactory } from "../Factory";

export class ControlsControllerFactory extends ControllerFactory {
	create(dispatcher, view) {
		return new ControlsController(dispatcher, view);
	}
}
