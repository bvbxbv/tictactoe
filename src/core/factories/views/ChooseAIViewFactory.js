import { ViewFactory } from "@factories/Factory";
import { ChooseAIView } from "@views/ChooseAIView";

export class ChooseAIViewFactory extends ViewFactory {
	create(chooseModalDOM) {
		return new ChooseAIView(chooseModalDOM);
	}
}
