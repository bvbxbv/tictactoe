import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import { defineConfig } from "vitest/config";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

export default defineConfig({
	resolve: {
		alias: {
			"@assets": path.resolve(__dirname, "src/assets"),
			"@pipes": path.resolve(__dirname, "src/pipes"),
			"@errors": path.resolve(__dirname, "src/errors"),
			"@models": path.resolve(__dirname, "src/models"),
			"@controllers": path.resolve(__dirname, "src/controllers"),
			"@views": path.resolve(__dirname, "src/views"),
			"@configs": path.resolve(__dirname, "src/configs"),
			"@core": path.resolve(__dirname, "src/core"),
			"@utils": path.resolve(__dirname, "src/utils"),
			"@factories": path.resolve(__dirname, "src/core/factories"),
		},
	},
	test: {
		environment: "jsdom",
		globals: true,
		setupFiles: "./vitest.setup.js",
	},
	define: {
		__DEBUG__: false,
	},
});
