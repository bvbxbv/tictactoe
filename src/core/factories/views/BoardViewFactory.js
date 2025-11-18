import { ViewFactory } from "@factories/Factory";
import { BoardView } from "@views/BoardView";

export class BoardViewFactory extends ViewFactory {
	create(onCellClick = null) {
		return new BoardView({
			boardDOM: this.domElement,
			onCellClick: onCellClick,
		});
	}
}
