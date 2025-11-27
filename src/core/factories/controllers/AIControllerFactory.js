import { AIController } from "@controllers/AIController";
import { ControllerFactory } from "../Factory";

export class AIControllerFactory extends ControllerFactory {
	create(view) {
		return new AIController(this.gameManager, this.dispatcher, view, this.store);
	}
}
