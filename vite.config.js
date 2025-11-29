import path from "path";
import { fileURLToPath } from "url";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
	plugins: [tailwindcss()],
	define: {
		__DEBUG__: false,
	},
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
		extensions: [".js", ".ts", ".jsx", ".tsx"],
	},
});
