import { ChooseAIController } from "@controllers/ChooseAIController";
import { ControllerFactory } from "../Factory";

export class ChooseAIControllerFactory extends ControllerFactory {
	create(view) {
		return new ChooseAIController(this.gameManager, this.dispatcher, view, this.store);
	}
}
