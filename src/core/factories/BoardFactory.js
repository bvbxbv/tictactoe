import { Board } from "@models/Board";
import { Factory } from "./Factory";

export class BoardFactory extends Factory {
	create(dispatcher, board) {
		return new Board(dispatcher, board);
	}
}
