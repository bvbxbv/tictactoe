export const UI = (() => {
	const ui = {
		cells: document.querySelectorAll(".cell"),
		timerDisplay: document.querySelector(".timer>.__content"),
		modal: Object.freeze({
			body: document.getElementById("modal"),
			message: document.getElementById("modal-message"),
			board: document.getElementById("mini-board"),
			button: document.getElementById("modal-btn"),
		}),
		score: Object.freeze({
			cross: document.getElementById("score-cross-player"),
			zero: document.getElementById("score-zero-player"),
		}),
	};
	return Object.freeze(ui);
})();
