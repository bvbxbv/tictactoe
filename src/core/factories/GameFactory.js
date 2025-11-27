import { Game } from "@models/Game";
import { Factory } from "./Factory";

export class GameFactory extends Factory {
	create(dispatcher, board, score, store) {
		return new Game(dispatcher, board, score, store);
	}
}
