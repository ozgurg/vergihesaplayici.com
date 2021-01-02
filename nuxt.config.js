import tr from "vuetify/es5/locale/tr";
import colors from "vuetify/lib/util/colors";

const Constants = {
	BASE_URL: "https://vergihesaplayici.com",
	PORT: 3000,
	NAME: "Vergi Hesaplayıcı",
	PRIMARY_COLOR: "#53BBAD"
};

export default {
	target: "static",
	components: true,
	server: {
		port: Constants.PORT
	},
	head: {
		titleTemplate: `%s - ${Constants.NAME}`,
		title: Constants.NAME,
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
			{
				src: "https://cdnjs.cloudflare.com/ajax/libs/babel-polyfill/7.12.1/polyfill.min.js" // For IE 11
			}
		]
	},
	buildModules: [
		"@nuxtjs/eslint-module",
		"@nuxtjs/vuetify"
	],
	modules: [
		"@nuxtjs/pwa",
		"@nuxtjs/sitemap"
	],
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
		color: Constants.PRIMARY_COLOR,
		failedColor: colors.red.base,
		throttle: 600
	},
	build: {
		extractCSS: true
	},
	sitemap: {
		hostname: Constants.BASE_URL,
		gzip: true,
		defaults: {
			changefreq: "monthly",
			priority: 1,
			lastmod: new Date()
		}
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
					primary: Constants.PRIMARY_COLOR
				},
				light: {
					primary: Constants.PRIMARY_COLOR
				}
			}
		}
	},
	pwa: {
		meta: {
			theme_color: Constants.PRIMARY_COLOR
		},
		manifest: {
			name: Constants.NAME,
			short_name: Constants.NAME,
			lang: "tr"
		}
	},
	env: {
		BASE_URL: Constants.BASE_URL
	}
};