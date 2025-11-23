import { EffectsController } from "@controllers/EffectsController";
import { ControllerFactory } from "@factories/Factory";

export class EffectsControllerFactory extends ControllerFactory {
	create(view) {
		return new EffectsController({
			dispatcher: this.dispatcher,
			gameManager: this.gameManager,
			view: view,
		});
	}
}
