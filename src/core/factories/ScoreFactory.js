import { Score } from "@models/Score";
import { Factory } from "./Factory";

export class ScoreFactory extends Factory {
	create(dispatcher, store) {
		return new Score(dispatcher, store);
	}
}
