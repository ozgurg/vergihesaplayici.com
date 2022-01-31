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
        "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
        "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
        "quotes": ["error", "double"],
        "comma-dangle": ["error", "never"],
        "semi": ["error", "always"],
        "indent": [
            "error",
            4,
            {
                "SwitchCase": 1
            }
        ],
        "no-tabs": [
            "error",
            {
                "allowIndentationTabs": true
            }
        ],
        "no-mixed-spaces-and-tabs": ["error", "smart-tabs"],
        "arrow-parens": ["error", "as-needed"],
        "max-len": ["off"],
        "object-curly-spacing": ["error", "always"],
        "curly": ["error", "multi-line"],
        "eol-last": ["error", "always"],
        "no-trailing-spaces": [
            "error",
            {
                "skipBlankLines": true
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
        "vue/html-indent": [
            "off",
            8
        ],
        "vue/order-in-components": ["error", {
            "order": [
                "el",
                "name",
                "layout",
                "data",
                "methods",
                "computed",
                "watch",
                "head",
                "mounted"
            ]
        }],
        "vue/attributes-order": ["error", {
            "order": [
                "DEFINITION",
                "CONDITIONALS",
                "LIST_RENDERING",
                "RENDER_MODIFIERS",
                "OTHER_DIRECTIVES",
                "SLOT",
                "UNIQUE",
                "CONTENT",
                "TWO_WAY_BINDING",
                "EVENTS",
                "GLOBAL",
                "OTHER_ATTR"
            ]
        }],
        "vue/singleline-html-element-content-newline": ["error"],
        "vue/html-closing-bracket-newline": ["error", {
            "singleline": "never",
            "multiline": "never"
        }],
        "vue/html-self-closing": ["error", {
            "html": {
                "void": "always",
                "normal": "always",
                "component": "always"
            }
        }],
        "vue/multi-word-component-names": "off"
    }
};
