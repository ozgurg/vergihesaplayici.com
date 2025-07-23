import path, { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "astro/config";
import { loadEnv } from "vite";
import packageJson from "./package.json" with { type: "json" };

import exchangeRatesIntegration from "./src/integrations/exchange-rates.js";
import extractColorFromThumbsIntegration from "./src/integrations/extract-color-from-thumbs.js";
import astroCompressIntegration from "astro-compress";
import astroVueIntegration from "@astrojs/vue";
import astroSitemapIntegration from "@astrojs/sitemap";
import { EnumChangefreq } from "sitemap/dist/lib/types";

import autoImportPlugin from "unplugin-auto-import/vite";
import autoImportVueComponentsPlugin from "unplugin-vue-components/vite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const {
    SERVER_PORT,
    SERVER_HOST,
    URL_BASE
} = loadEnv(process.env.NODE_ENV, process.cwd(), "");

// oxlint-disable-next-line no-anonymous-default-export no-default-export
export default defineConfig({
    prefetch: {
        // No need to increase the bandwidth for now
        prefetchAll: false
        // defaultStrategy: "hover"
    },
    devToolbar: {
        enabled: false
    },
    server: {
        host: SERVER_HOST,
        port: Number.parseInt(SERVER_PORT, 10)
    },
    build: {
        inlineStylesheets: "always"
    },
    output: "static",
    site: URL_BASE,
    trailingSlash: "always",
    integrations: [
        exchangeRatesIntegration(),
        extractColorFromThumbsIntegration(),
        astroCompressIntegration({
            CSS: true,
            HTML: false, // Setting this to `true` somehow breaks the `.modal` `@starting-style` definition
            Image: true,
            JavaScript: true,
            SVG: false,
            Logger: 1
        }),
        astroVueIntegration(),
        astroSitemapIntegration({
            serialize(item) {
                // TODO: It can be dynamic via `PageDef`

                // https://developers.google.com/search/blog/2006/04/using-lastmod-attribute
                const LAST_MODIFIED_DATE = new Date().toDateString();

                if (/yazilar/.test(item.url)) {
                    item.changefreq = EnumChangefreq.MONTHLY;
                    item.lastmod = LAST_MODIFIED_DATE;
                    item.priority = .6;
                }

                if (/hesaplayicilar/.test(item.url)) {
                    item.changefreq = EnumChangefreq.MONTHLY;
                    item.lastmod = LAST_MODIFIED_DATE;
                    item.priority = .7;
                }

                if (/kdv-hesaplayici/.test(item.url) || /vergini-olustur/.test(item.url)) {
                    item.changefreq = EnumChangefreq.MONTHLY;
                    item.lastmod = LAST_MODIFIED_DATE;
                    item.priority = .8;
                }

                if (/telefon-vergisi-hesaplayici/.test(item.url) || /konsol-vergisi-hesaplayici/.test(item.url)) {
                    item.changefreq = EnumChangefreq.DAILY;
                    item.lastmod = LAST_MODIFIED_DATE;
                    item.priority = .9;
                }

                // `/`
                item.changefreq = EnumChangefreq.MONTHLY;
                item.lastmod = LAST_MODIFIED_DATE;
                item.priority = 1;

                return item;
            }
        })
    ],
    vite: {
        build: {
            rollupOptions: {
                output: {
                    compact: true,
                    entryFileNames: `[name]-${packageJson.version}.js`,
                    chunkFileNames: `[name]-[hash]-${packageJson.version}.js`,
                    assetFileNames: `assets/[name]-[hash]-${packageJson.version}[extname]`
                }
            }
        },
        plugins: [
            autoImportPlugin({
                dts: "unplugin-auto-import.d.ts",
                dirs: [
                    "src/utils/**.ts",
                    "src/composables/**.ts"
                ],
                imports: [
                    "vue",
                    {
                        from: "vue",
                        imports: [
                            "IntrinsicElementAttributes"
                        ],
                        type: true
                    }
                ]
            }),
            autoImportVueComponentsPlugin({
                dts: "unplugin-vue-components.d.ts",
                dirs: [
                    "src/components"
                ]
            })
        ],
        resolve: {
            alias: {
                "@": path.resolve(__dirname, "src"),
                "@root": path.resolve(__dirname, ".")
            }
        },
        css: {
            preprocessorOptions: {
                scss: {
                    quietDeps: true,
                    silenceDeprecations: [
                        "import", // https://sass-lang.com/documentation/breaking-changes/import/#silencing-specific-deprecations
                        "global-builtin", // https://sass-lang.com/documentation/breaking-changes/import/#silencing-specific-deprecations
                        "mixed-decls", // https://sass-lang.com/documentation/breaking-changes/mixed-decls/#silencing-specific-deprecations
                        "legacy-js-api" // https://sass-lang.com/documentation/breaking-changes/legacy-js-api/#silencing-warnings
                    ],
                    //language=scss
                    additionalData: `
                        @use "sass:map";
                        // noinspection CssUnknownTarget
                        @import "@/assets/css/_mixins.scss";
                    `
                }
            }
        }
    }
});
