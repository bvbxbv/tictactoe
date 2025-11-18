import { ModalController } from "@controllers/ModalController";
import { ControllerFactory } from "@factories/Factory";

export class ModalControllerFactory extends ControllerFactory {
	create(view) {
		return new ModalController({
			gameManager: this.gameManager,
			dispatcher: this.dispatcher,
			view: view,
		});
	}
}
