import { log } from "../utils/consolawrapper";

export const UI = {
	_byId(id) {
		const element = document.getElementById(id);
		if (!element) log.error(`UI element not found: "${id}"`);
		return element;
	},

	_bySelector(selector, root = document) {
		const elements = root.querySelectorAll(selector);
		if (!elements || elements.length === 0) log.error(`UI elements not found: "${selector}"`);
		return elements;
	},

	get board() {
		const root = this._byId("board-content");
		return { root, cells: root ? this._bySelector(".cell", root) : [] };
	},

	get timerDisplay() {
		return this._byId("timer-display");
	},

	get modal() {
		return {
			body: this._byId("modal"),
			title: this._byId("modal-message"),
			board: this._byId("mini-board"),
			button: this._byId("modal-btn"),
		};
	},

	get score() {
		return {
			cross: this._byId("score-cross-player"),
			zero: this._byId("score-zero-player"),
		};
	},
};
