import tr from "vuetify/es5/locale/tr";
import colors from "vuetify/lib/util/colors";

export default {
	target: "static",
	components: true,
	server: {
		port: process.env.PORT
	},
	head: {
		titleTemplate: `%s - ${process.env.NAME}`,
		title: process.env.NAME,
		meta: [
			{ charset: "UTF-8" },
			{ name: "viewport", content: "width=device-width, initial-scale=1" },
			{ name: "robots", content: "index, follow" },
			{ name: "format-detection", content: "telephone=no" },
			{ name: "msapplication-tap-highlight", content: "no" },
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
		"@/assets/css/style.scss"
	],
	plugins: [
		{
			src: "@/plugins/client/firebase.js",
			mode: "client"
		},
		{
			src: "@/plugins/client/money-format.js",
			mode: "client"
		},
		{
			src: "@/plugins/client/vue-clipboard2.js",
			mode: "client"
		}
	],
	loading: {
		color: process.env.PRIMARY_COLOR,
		failedColor: colors.red.base,
		throttle: 600
	},
	build: {
		extractCSS: true
	},
	sitemap: {
		hostname: process.env.BASE_URL,
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
					primary: process.env.PRIMARY_COLOR
				},
				light: {
					primary: process.env.PRIMARY_COLOR
				}
			}
		}
	},
	pwa: {
		meta: {
			theme_color: process.env.PRIMARY_COLOR
		},
		manifest: {
			name: process.env.NAME,
			short_name: process.env.NAME,
			lang: "tr"
		}
	},
	env: {
		BASE_URL: process.env.BASE_URL
	}
};