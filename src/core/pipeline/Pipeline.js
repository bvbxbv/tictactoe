import { Pipe } from "./Pipe";

export class Pipeline {
	#pipes;
	#meta = {};
	constructor(pipes) {
		this.#pipes = pipes;
		this.#pipes.forEach((pipe) => {
			if (!(pipe.prototype instanceof Pipe)) {
				// exception
				throw new Error(`${pipe} не потомок Pipe`);
			}
		});
	}

	run(data) {
		let response = { start: data, result: null, meta: this.#meta };
		for (const pipeClass of this.#pipes) {
			const pipe = new pipeClass(response);
			pipe.execute();
			response = pipe.data;
			if (response.result) break;
		}
		return response.result;
	}

	passThrough(metaData) {
		this.#meta = { ...this.#meta, ...metaData };
		return this;
	}
}
