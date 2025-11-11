export const PlayerMark = Object.freeze({
	Cross: "X",
	Zero: "O",
});

export const CellState = Object.freeze({
	Empty: "",
	Cross: PlayerMark.Cross,
	Zero: PlayerMark.Zero,
});

export const GameState = Object.freeze({
	Win: "win",
	Draw: "draw",
	Playing: "playing",
});
