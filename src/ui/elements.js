// FIXME: modal.message -> modal.title
export const UI = {
	get board() {
		const root = document.getElementById("board-content");
		return { root, cells: root ? root.querySelectorAll(".cell") : [] };
	},
	get timerDisplay() {
		return document.querySelector(".timer > .__content");
	},
	get modal() {
		return {
			body: document.getElementById("modal"),
			message: document.getElementById("modal-message"),
			board: document.getElementById("mini-board"),
			button: document.getElementById("modal-btn"),
		};
	},
	get score() {
		return {
			cross: document.getElementById("score-cross-player"),
			zero: document.getElementById("score-zero-player"),
		};
	},
};
