import { createConsola, LogLevels } from "consola";

export const log = createConsola({
	level: __DEBUG__ ? LogLevels.debug : LogLevels.warn,
});
