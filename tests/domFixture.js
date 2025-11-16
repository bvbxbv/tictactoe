function cells(times = 9) {
	return '<div class="cell"></div>'.repeat(times);
}

export function getDomFixture() {
	return `
		<div id="board-content">
			${cells(9)}
		</div>

		<div class="timer">
			<div class="__content"></div>
		</div>

		<div id="modal">
			<div id="modal-message"></div>
			<div id="mini-board"></div>
			<button id="modal-btn"></button>
		</div>

		<div id="score-cross-player"></div>
		<div id="score-zero-player"></div>
	`;
}
