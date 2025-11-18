import { ScoreController } from "@controllers/ScoreController";
import { ControllerFactory } from "@factories/Factory";

export class ScoreControllerFactory extends ControllerFactory {
	create(view) {
		return new ScoreController({
			gameManager: this.gameManager,
			dispatcher: this.dispatcher,
			view: view,
		});
	}
}
