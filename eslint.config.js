import js from "@eslint/js";
import prettier from "eslint-config-prettier";
import pluginImport from "eslint-plugin-import";
import pluginPrettier from "eslint-plugin-prettier";

export default [
	{
		ignores: ["node_modules", "dist", "docs/", ".husky"],
	},
	{
		languageOptions: {
			ecmaVersion: "latest",
			sourceType: "module",
			globals: {
				Audio: "readonly",
				Event: "readonly",
				setInterval: "readonly",
				setTimeout: "readonly",
				clearInterval: "readonly",
				TextEncoder: "readonly",
				TextDecoder: "readonly",
				global: "readonly",
				console: "readonly",
				document: "readonly",
				window: "readonly",
				__DEBUG__: "readonly",
				localStorage: "readonly",
			},
		},
		plugins: {
			import: pluginImport,
			prettier: pluginPrettier,
		},
		rules: {
			...js.configs.recommended.rules,
			"prettier/prettier": "error",
			"no-unused-vars": "warn",
			"no-console": "off",
			"import/order": [
				"warn",
				{
					groups: ["builtin", "external", "internal", "parent", "sibling", "index"],
					alphabetize: { order: "asc", caseInsensitive: true },
				},
			],
		},
	},
	prettier,
];
