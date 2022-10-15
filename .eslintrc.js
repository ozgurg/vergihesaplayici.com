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
    plugins: [
        "jsdoc"
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
        "valid-jsdoc": 0,
        "jsdoc/check-access": 1,
        "jsdoc/check-alignment": 1,
        "jsdoc/check-indentation": 1,
        "jsdoc/check-line-alignment": 1,
        "jsdoc/check-param-names": 1,
        "jsdoc/check-property-names": 1,
        "jsdoc/check-syntax": 1,
        "jsdoc/check-tag-names": 1,
        "jsdoc/check-types": 1,
        "jsdoc/check-values": 1,
        "jsdoc/empty-tags": 1,
        "jsdoc/implements-on-classes": 1,
        "jsdoc/match-description": 1,
        "jsdoc/multiline-blocks": 1,
        "jsdoc/newline-after-description": 1,
        "jsdoc/no-bad-blocks": 1,
        "jsdoc/no-defaults": 1,
        "jsdoc/no-missing-syntax": 0,
        "jsdoc/no-multi-asterisks": 1,
        "jsdoc/no-restricted-syntax": 0,
        "jsdoc/no-types": 0,
        "jsdoc/no-undefined-types": 1,
        "jsdoc/require-asterisk-prefix": 1,
        "jsdoc/require-description": 0,
        "jsdoc/require-description-complete-sentence": 0,
        "jsdoc/require-example": 0,
        "jsdoc/require-file-overview": 0,
        "jsdoc/require-hyphen-before-param-description": 1,
        "jsdoc/require-jsdoc": 1,
        "jsdoc/require-param": 1,
        "jsdoc/require-param-description": 0,
        "jsdoc/require-param-name": 1,
        "jsdoc/require-param-type": 1,
        "jsdoc/require-property": 1,
        "jsdoc/require-property-description": 1,
        "jsdoc/require-property-name": 1,
        "jsdoc/require-property-type": 1,
        "jsdoc/require-returns": 1,
        "jsdoc/require-returns-check": 1,
        "jsdoc/require-returns-description": 0,
        "jsdoc/require-returns-type": 1,
        "jsdoc/require-throws": 1,
        "jsdoc/require-yields": 1,
        "jsdoc/require-yields-check": 1,
        "jsdoc/tag-lines": 1,
        "jsdoc/valid-types": 1
    }
};
