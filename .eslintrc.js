module.exports = {
    root: true,
    env: {
        browser: true,
        node: true
    },
    extends: [
        "@nuxtjs",
        "plugin:nuxt/recommended",
        "google"
    ],
    parserOptions: {
        parser: "@babel/eslint-parser",
        requireConfigFile: false
    },
    rules: {
        /* "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
        "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
        "quotes": ["error", "double"],
        "comma-dangle": ["error", "never"],
        "indent": [
            "error",
            4,
            {
                "SwitchCase": 1
            }
        ],
        "vue/script-indent": [
            "off",
            4,
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
        "curly": ["error", "multi-line"],
        "no-invalid-this": ["off"],
        "eol-last": ["error", "always"],
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
        "object-curly-spacing": ["error", "always"] */
    }
};
