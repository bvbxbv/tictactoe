const player = Object.freeze({
	Cross: "X",
	Zero: "O",
});

const cellState = Object.freeze({
	Empty: "",
	Cross: player.Cross,
	Zero: player.Zero,
});

export class Game {
	#board = Array(9).fill(cellState.Empty);
	#currentPlayer = this.#getRandomPlayer();

	get whoseMove() {
		return this.#currentPlayer;
	}

	get board() {
		return [...this.#board];
	}

	#getRandomPlayer() {
		const values = Object.values(player);
		const random = values[Math.floor(Math.random() * values.length)];
		return random;
	}

	makeMove(index) {
		if (this.#board[index] !== cellState.Empty) {
			return false;
		}
		this.#board[index] = this.#currentPlayer;
		this.#togglePlayer();
		return true;
	}

	#togglePlayer() {
		this.#currentPlayer = this.#currentPlayer === player.Cross ? player.Zero : player.Cross;
	}

	reset() {
		this.#board = Array(9).fill(cellState.Empty);
		this.#currentPlayer = this.#getRandomPlayer();
	}
}
