import { ViewFactory } from "@factories/Factory";
import { EffectsView } from "@views/EffectsView";

export class EffectsViewFactory extends ViewFactory {
	create(audio) {
		return new EffectsView({
			audio,
		});
	}
}
