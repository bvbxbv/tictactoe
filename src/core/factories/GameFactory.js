import { Game } from "@models/Game";
import { Factory } from "./Factory";

export class GameFactory extends Factory {
	create(dispatcher, board, score) {
		return new Game(dispatcher, board, score);
	}
}
