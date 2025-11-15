import { defineConfig } from "vitest/config";
import dotenv from "dotenv";

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
