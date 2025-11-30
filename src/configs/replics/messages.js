import { Hannibal } from "./hannibal";
import { Heizenberg } from "./heizenberg";
import { PostalDude } from "./postalDude";
import { TylerDurden } from "./tylerDurden";
import { TywinLanister } from "./tywinLannister";

export const messages = {
	get hannibal() {
		return Hannibal;
	},
	get heizenberg() {
		return Heizenberg;
	},
	get postaldude() {
		return PostalDude;
	},
	get tylerdurden() {
		return TylerDurden;
	},
	get tywinlanister() {
		return TywinLanister;
	},
};
