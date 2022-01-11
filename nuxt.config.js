import tr from "vuetify/es5/locale/tr";
import colors from "vuetify/lib/util/colors";

export default {
    target: "static",
    components: true,
    server: {
        host: process.env.HOST,
        port: process.env.PORT
    },
    head: {
        titleTemplate: `%s - ${process.env.APP_NAME}`,
        title: process.env.APP_NAME,
        meta: [
            { charset: "UTF-8" },
            { name: "viewport", content: "width=device-width, initial-scale=1" },
            { name: "robots", content: "index, follow" },
            { name: "format-detection", content: "telephone=no" },
            { name: "msapplication-tap-highlight", content: "no" },
            { name: "twitter:card", content: "summary" },
            { name: "twitter:site", content: process.env.APP_TWITTER_USERNAME },
            { name: "twitter:creator", content: process.env.APP_TWITTER_USERNAME },
            { "http-equiv": "X-UA-Compatible", "content": "ie=edge" },
            { hid: "description", name: "description", content: "vergihesaplayici.com, vergi hesaplar." }
        ],
        link: [
            { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
            { rel: "dns-prefetch", href: "https://firebaseinstallations.googleapis.com" }
        ],
        script: [
            { src: "https://cdnjs.cloudflare.com/ajax/libs/babel-polyfill/7.12.1/polyfill.min.js" } // For IE 11
        ]
    },
    buildModules: [
        "@nuxtjs/dotenv",
        "@nuxtjs/eslint-module",
        "@nuxtjs/vuetify"
    ],
    modules: [
        "@nuxtjs/pwa",
        "@nuxtjs/sitemap",
        [
            "nuxt-canonical",
            {
                baseUrl: process.env.APP_URL,
                trailingSlashes: false
            }
        ]
    ],
    build: {
        extractCSS: true
    },
    css: [
        "@/assets/css/style.scss"
    ],
    plugins: [
        { src: "@/plugins/client/firebase.js", mode: "client" },
        { src: "@/plugins/client/money-format.js", mode: "client" },
        { src: "@/plugins/client/vue-clipboard2.js", mode: "client" },
        { src: "@/plugins/client/vue-disqus.js", mode: "client" }
    ],
    loading: {
        color: process.env.APP_PRIMARY_COLOR,
        failedColor: colors.red.base,
        throttle: 600
    },
    vuetify: {
        lang: {
            locales: { tr },
            current: "tr"
        },
        theme: {
            dark: true,
            options: {
                variations: false
            },
            themes: {
                dark: {
                    primary: process.env.APP_PRIMARY_COLOR
                }
            }
        }
    },
    sitemap: {
        hostname: process.env.APP_URL,
        gzip: true,
        defaults: {
            changefreq: "monthly",
            priority: 1,
            lastmod: new Date()
        }
    },
    pwa: {
        meta: {
            theme_color: process.env.APP_PRIMARY_COLOR
        },
        manifest: {
            name: process.env.APP_NAME,
            short_name: process.env.APP_NAME,
            lang: "tr"
        }
    }
};
