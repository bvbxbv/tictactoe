import { ViewFactory } from "@factories/Factory";
import { TimerView } from "@views/TimerView";

export class TimerViewFactory extends ViewFactory {
	create(startTime, onTimerEnd = null) {
		return new TimerView({
			timerEl: this.domElement,
			startTime: startTime,
			onTimerEnd: onTimerEnd,
		});
	}
}
