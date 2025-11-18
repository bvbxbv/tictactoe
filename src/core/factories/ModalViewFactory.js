import { ModalView } from "../../ui/views/ModalView";
import { ViewFactory } from "./Factory";

export class ModalViewFactory extends ViewFactory {
	create(onClose = null) {
		return new ModalView({
			elements: this.domElement,
			onClose: onClose,
		});
	}
}
