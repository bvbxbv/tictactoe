import { BoardController } from "@controllers/BoardController";
import { ControllerFactory } from "@factories/Factory";

export class BoardControllerFactory extends ControllerFactory {
	create(board, view) {
		return new BoardController({
			gameManager: this.gameManager,
			dispatcher: this.dispatcher,
			board: board,
			view: view,
			store: this.store,
		});
	}
}
