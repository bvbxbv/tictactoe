import { TimerView } from "../../ui/views/TimerView";
import { ViewFactory } from "./Factory";

export class TimerViewFactory extends ViewFactory {
	create(startTime, onTimerEnd = null) {
		return new TimerView({
			timerEl: this.domElement,
			startTime: startTime,
			onTimerEnd: onTimerEnd,
		});
	}
}
