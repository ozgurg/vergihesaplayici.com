module.exports = {
	root: true,
	env: {
		browser: true,
		node: true
	},
	extends: [
		"plugin:vue/essential",
		"eslint:recommended",
		"google"
	],
	parserOptions: {
		parser: "babel-eslint"
	},
	rules: {
		"no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
		"no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
		"quotes": ["error", "double"],
		"comma-dangle": ["error", "never"],
		"indent": [
			"error",
			"tab",
			{
				"SwitchCase": 1
			}
		],
		"vue/script-indent": [
			"off",
			"tab",
			{
				"baseIndent": 0,
				"switchCase": 0,
				"ignores": []
			}
		],
		"no-tabs": [
			"error",
			{
				"allowIndentationTabs": true
			}
		],
		"curly": ["error", "all"],
		"no-invalid-this": ["off"],
		"eol-last": ["error", "never"],
		"max-len": ["off"],
		"no-trailing-spaces": [
			"error",
			{
				"skipBlankLines": true
			}
		],
		"no-mixed-spaces-and-tabs": "off",
		"arrow-parens": ["error", "as-needed"],
		"no-case-declarations": ["off"],
		"require-jsdoc": ["off"],
		"object-curly-spacing": ["error", "always"]
	}
};