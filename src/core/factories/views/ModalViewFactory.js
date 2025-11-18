import { ViewFactory } from "@factories/Factory";
import { ModalView } from "@views/ModalView";

export class ModalViewFactory extends ViewFactory {
	create(onClose = null) {
		return new ModalView({
			elements: this.domElement,
			onClose: onClose,
		});
	}
}
