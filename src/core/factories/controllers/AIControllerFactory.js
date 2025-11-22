import { AIController } from "@controllers/AIController";
import { ControllerFactory } from "../Factory";

export class AIControllerFactory extends ControllerFactory {
	create(gameManager, dispatcher) {
		return new AIController(gameManager, dispatcher);
	}
}
