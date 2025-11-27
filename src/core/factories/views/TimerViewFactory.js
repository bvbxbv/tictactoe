import { ViewFactory } from "@factories/Factory";
import { TimerView } from "@views/TimerView";

export class TimerViewFactory extends ViewFactory {
	create() {
		return new TimerView(this.domElement);
	}
}
