import js from "@eslint/js";
import pluginImport from "eslint-plugin-import";

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
		},
		rules: {
			...js.configs.recommended.rules,
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
