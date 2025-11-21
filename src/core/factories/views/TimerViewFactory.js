import { appConfigs } from "@configs/appConfigs";
import { ViewFactory } from "@factories/Factory";
import { TimerView } from "@views/TimerView";

export class TimerViewFactory extends ViewFactory {
	create(startTime, onTimerEnd = null) {
		return new TimerView({
			timerEl: this.domElement,
			startTime: appConfigs.timer.startTime,
			onTimerEnd: onTimerEnd,
		});
	}
}
