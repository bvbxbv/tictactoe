import { ViewFactory } from "@factories/Factory";
import { ScoreView } from "@views/ScoreView";

export class ScoreViewFactory extends ViewFactory {
	create() {
		const { crossEl, zeroEl } = this.domElement;
		return new ScoreView({
			crossEl,
			zeroEl,
		});
	}
}
