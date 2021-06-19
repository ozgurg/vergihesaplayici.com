import tr from "vuetify/es5/locale/tr";
import colors from "vuetify/lib/util/colors";

const Config = {
    baseUrl: "https://vergihesaplayici.com",
    host: "192.168.1.3",
    port: 3000,
    name: "Vergi Hesaplayıcı",
    primaryColor: "#53BBAD"
};

export default {
    target: "static",
    components: true,
    server: {
        host: Config.host,
        port: Config.port
    },
    head: {
        titleTemplate: `%s - ${Config.name}`,
        title: Config.name,
        meta: [
            { charset: "UTF-8" },
            { name: "viewport", content: "width=device-width, initial-scale=1" },
            { name: "robots", content: "index, follow" },
            { name: "format-detection", content: "telephone=no" },
            { name: "msapplication-tap-highlight", content: "no" },
            { name: "twitter:card", content: "summary" },
            { name: "twitter:site", content: "@ozgurg0" },
            { name: "twitter:creator", content: "@ozgurg0" },
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
        "@nuxtjs/eslint-module",
        "@nuxtjs/vuetify"
    ],
    modules: [
        "@nuxtjs/pwa",
        "@nuxtjs/sitemap",
        [
            "nuxt-canonical",
            {
                baseUrl: Config.baseUrl,
                trailingSlashes: false
            }
        ]
    ],
    env: {
        baseUrl: Config.baseUrl
    },
    build: {
        extractCSS: true
    },
    css: [
        "@/assets/css/vuetify-customization.scss",
        "@/assets/css/style.scss"
    ],
    plugins: [
        { src: "@/plugins/client/firebase.js", mode: "client" },
        { src: "@/plugins/client/money-format.js", mode: "client" },
        { src: "@/plugins/client/vue-clipboard2.js", mode: "client" },
        { src: "@/plugins/client/vue-disqus.js", mode: "client" }
    ],
    loading: {
        color: Config.primaryColor,
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
                    primary: Config.primaryColor
                }
            }
        }
    },
    sitemap: {
        hostname: Config.baseUrl,
        gzip: true,
        defaults: {
            changefreq: "monthly",
            priority: 1,
            lastmod: new Date()
        }
    },
    pwa: {
        meta: {
            theme_color: Config.primaryColor
        },
        manifest: {
            name: Config.name,
            short_name: Config.name,
            lang: "tr"
        }
    }
};
