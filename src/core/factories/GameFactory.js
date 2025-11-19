import { Game } from "@models/Game";
import { Factory } from "./Factory";

export class GameFactory extends Factory {
	create(dispatcher) {
		return new Game(dispatcher);
	}
}
