// oxlint-disable-next-line extensions
import { getViteConfig } from "astro/config";

process.env.TZ = "Europe/Istanbul";

// oxlint-disable-next-line no-anonymous-default-export no-default-export
export default getViteConfig({
    test: {
        environment: "jsdom",
        globals: true,
        env: {
            SITE: "https://vergihesaplayici.com" // It can be any URL, as it is only used in tests
        },
        coverage: {
            provider: "istanbul",
            exclude: [
                // TODO
                "src/components/*.astro",


                // TODO: Too complex to write unit test
                "src/integrations/**",
                "src/{pages,layouts}/**/*.astro",
                "src/utils/thumb-loader.ts",
                "src/utils/og-image.ts",
                "src/components/go-to-calculator-button.vue",
                "src/components/calculator-share-modal/**.vue", // Most of them
                "src/domains/**/**.vue",


                // No test needed to raw data
                "src/domains/telefon-vergisi-hesaplayici/db/**.ts",
                "src/domains/konsol-vergisi-hesaplayici/db/**.ts",


                // They are just input-output functions.
                // No tests are needed for now.
                // TypeScript enforces the types for us.
                "src/domains/*/db.ts",
                "src/domains/{telefon-vergisi-hesaplayici,konsol-vergisi-hesaplayici}/utils/{build-page-meta,map-presets-for-calculator-preset-carousel-component}.ts",
                "src/domains/*/utils/{build-result-list,build-screenshot-data,calculate-results}.ts",


                "src/pages/manifest.json.ts",
                "src/pages/og/*.jpg.ts",
                "src/domains/**/page-def.ts",
                "src/domains/**/types.ts",
                "src/domains/**/config.ts",
                "src/content.config.ts",
                "public/sw.js",
                "astro.config.mts",
                "vitest.config.ts",
                "dist",
                "__test__",
                "create-csp-nonce-txt.js",
                "create-firebase-json.js"
            ]
        }
    }
});
