import { log } from "@utils/consolawrapper";

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

	get mount() {
		return document.documentElement;
	},

	get gameControls() {
		return {
			root: this._byId("controls"),
			restartGameButton: this._byId("game-restart"),
			toggleVolumeButton: this._byId("volume-toggle"),
			switchColorThemeButton: this._byId("color-theme-switch"),
			giveUpButton: this._byId("give-up"),
			openMenuButton: this._byId("menu-open"),
			icons: {
				unmutedIcon: this._byId("volume-unmuted-icon"),
				mutedIcon: this._byId("volume-muted-icon"),
			},
		};
	},

	get board() {
		const root = this._byId("board-content");
		return { root, cells: root ? this._bySelector(".cell", root) : [] };
	},

	get chat() {
		return {
			chat: this._byId("chat"),
			root: this._byId("chat-sidebar"),
			openButton: this._byId("menu-open"),
			closeButton: this._byId("close-sidebar"),
		};
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
			crossLabel: this._byId("score-cross-label"),
			zeroLabel: this._byId("score-zero-label"),
		};
	},
};
