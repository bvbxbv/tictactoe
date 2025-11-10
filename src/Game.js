export const player = Object.freeze({
	Cross: "X",
	Zero: "O",
});

export const cellState = Object.freeze({
	Empty: "",
	Cross: player.Cross,
	Zero: player.Zero,
});

export const checkWinnerResult = Object.freeze({
	win: "win",
	draw: "draw",
	playing: "playing",
});

export class Game {
	#board = Array(9).fill(cellState.Empty);
	#currentPlayer = player.Cross;

	get whoseMove() {
		return this.#currentPlayer;
	}

	get board() {
		return [...this.#board];
	}

	makeMove(index) {
		if (this.#board[index] !== cellState.Empty) {
			return {
				success: false,
			};
		}
		const current = this.#currentPlayer;
		this.#board[index] = current;
		this.#togglePlayer();
		return { success: true, currentPlayer: current };
	}

	checkWinner() {
		const combos = [
			[0, 1, 2],
			[3, 4, 5],
			[6, 7, 8],
			[0, 3, 6],
			[1, 4, 7],
			[2, 5, 8],
			[0, 4, 8],
			[2, 4, 6],
		];

		for (const [a, b, c] of combos) {
			if (this.#board[a] && this.#board[a] === this.#board[b] && this.#board[b] === this.#board[c]) {
				return {
					status: checkWinnerResult.win,
					winner: this.#board[a],
					combo: [a, b, c],
				};
			}
		}

		if (this.#board.every((cell) => cell !== cellState.Empty)) {
			return {
				status: checkWinnerResult.draw,
			};
		}

		return {
			status: checkWinnerResult.playing,
		};
	}

	#togglePlayer() {
		this.#currentPlayer = this.#currentPlayer === player.Cross ? player.Zero : player.Cross;
	}

	reset() {
		this.#board = Array(9).fill(cellState.Empty);
		this.#currentPlayer = player.Cross;
	}
}
