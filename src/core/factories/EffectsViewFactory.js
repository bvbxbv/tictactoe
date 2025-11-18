import { EffectsView } from "../../ui/views/EffectsView";
import { ViewFactory } from "./Factory";

export class EffectsViewFactory extends ViewFactory {
	create(audio) {
		return new EffectsView({
			audio,
		});
	}
}
