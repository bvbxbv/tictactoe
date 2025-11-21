import { Score } from "@models/Score";
import { Factory } from "./Factory";

export class ScoreFactory extends Factory {
	create(dispatcher, startScore = null) {
		return new Score(dispatcher, startScore);
	}
}
