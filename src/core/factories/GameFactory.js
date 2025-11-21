import { Game } from "@models/Game";
import { Factory } from "./Factory";

export class GameFactory extends Factory {
	create(dispatcher, score) {
		return new Game(dispatcher, score);
	}
}
