// oxlint-disable-next-line no-anonymous-default-export no-default-export
export default {
    extends: [
        "@commitlint/config-conventional"
    ],
    rules: {
        "type-enum": [
            2,
            "always",
            [
                "build",
                "chore",
                "ci",
                "docs",
                "feat",
                "fix",
                "perf",
                "refactor",
                "revert",
                "style",
                "test",
                "design",
                "content"
            ]
        ]
    }
};
