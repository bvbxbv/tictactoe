import { appConfigs } from "./appConfigs";

export const PlayerMark = Object.freeze({
	Cross: appConfigs.player.cross.char,
	Zero: appConfigs.player.zero.char,
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
