import { Pipe } from "./Pipe";

export class Pipeline {
	#pipes;

	constructor(pipes) {
		this.#pipes = pipes;
		this.#pipes.forEach((pipe) => {
			if (!(pipe instanceof Pipe)) {
				// exception
				throw new Error(`${pipe} не потомок Pipe`);
			}
		});
	}

	run(data) {
		let result = data;
		this.#pipes.forEach((pipeClass) => {
			const pipe = new pipeClass(result);
			pipe.execute();
			result = pipe.data();
		});
		return result;
	}
}
