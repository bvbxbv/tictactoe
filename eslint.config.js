import js from "@eslint/js";
import pluginImport from "eslint-plugin-import";
import prettier from "eslint-config-prettier";
import pluginPrettier from "eslint-plugin-prettier";

export default [
	{
		ignores: ["node_modules", "dist", ".husky"],
	},
	{
		env: {
			browser: true,
			es2021: true,
		},
		languageOptions: {
			ecmaVersion: "latest",
			sourceType: "module",
			globals: {
				console: "readonly",
				document: "readonly",
				window: "readonly",
			},
		},
		plugins: {
			import: pluginImport,
			prettier: pluginPrettier,
		},
		extends: ["airbnb-base", prettier],
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
];
