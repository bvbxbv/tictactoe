import { ScoreView } from "../../ui/views/ScoreView";
import { ViewFactory } from "./Factory";

export class ScoreViewFactory extends ViewFactory {
	create() {
		const { crossEl, zeroEl } = this.domElement;
		return new ScoreView({
			crossEl,
			zeroEl,
		});
	}
}
