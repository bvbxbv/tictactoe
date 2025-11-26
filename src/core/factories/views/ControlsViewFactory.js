import { ViewFactory } from "@factories/Factory";
import { ControlsView } from "@views/ControlsView";

export class ControlsViewFactory extends ViewFactory {
	create(controlsDOM) {
		return new ControlsView({
			controlsDOM: controlsDOM,
		});
	}
}
