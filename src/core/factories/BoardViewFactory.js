import { BoardView } from "../../ui/views/BoardView";
import { ViewFactory } from "./Factory";

export class BoardViewFactory extends ViewFactory {
	create(onCellClick = null) {
		return new BoardView({
			boardDOM: this.domElement,
			onCellClick: onCellClick,
		});
	}
}
