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
        "no-cond-assign": "error",
        "no-constant-condition": "error",
        "no-unreachable": "error",
        "no-unused-expressions": "error",
        "no-constant-binary-expression": "error",
        "no-sequences": "error",
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
        "max-len": 0,
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
                "head",
                "data",
                "methods",
                "computed",
                "watch",
                "mounted"
            ]
        }],
        "vue/attributes-order": ["error", {
            "order": [
                "DEFINITION",
                "LIST_RENDERING",
                "CONDITIONALS",
                "RENDER_MODIFIERS",
                "GLOBAL",
                ["UNIQUE", "SLOT"],
                "TWO_WAY_BINDING",
                "OTHER_DIRECTIVES",
                "OTHER_ATTR",
                "EVENTS",
                "CONTENT"
            ],
            "alphabetical": false
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
        "vue/multi-word-component-names": "off",
        "require-jsdoc": "off",
        "valid-jsdoc": 0
    }
};
