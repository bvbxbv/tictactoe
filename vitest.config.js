import dotenv from "dotenv";
import { defineConfig } from "vitest/config";

dotenv.config();

export default defineConfig({
	test: {
		environment: "jsdom",
		globals: true,
		setupFiles: "./vitest.setup.js",
	},
	define: {
		__DEBUG__: true, // <-- Теперь vitest видит глобал
	},
});
