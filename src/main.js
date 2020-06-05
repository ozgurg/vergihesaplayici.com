import Vue from "vue";
import App from "./modules/App.vue";
import Buefy from "buefy";
import VueMeta from "vue-meta";
import router from "./_router";
import store from "./store/_index";
import "./_service-worker";
import "./api/firebase";


// Buefy
Vue.use(Buefy, {
	defaultUseHtml5Validation: false,
	defaultIconPack: "mdi"
});

// Vue meta
Vue.prototype.VueMetaTemplate = "%s - Vergi Hesaplayıcı";
Vue.use(VueMeta);

// Vue configuration
Vue.config.productionTip = false;

// Global components
Vue.component("Hero", () => import("./modules/Common/Hero"));
Vue.component("Share", () => import("./modules/Common/Share"));
Vue.component("MinimumWageInfo", () => import("./modules/Common/MinimumWageInfo"));
Vue.component("ExchangeRates", () => import("./modules/Common/ExchangeRates"));

// Global mixins
Vue.mixin({
	methods: {
		currencyFormat(price, currency, minimumFractionDigits = 2) {
			return new Intl.NumberFormat(
				"tr-TR",
				{
					style: "currency",
					currency,
					minimumFractionDigits
				}
			).format(price);
		}
	}
});

// Vue instance
new Vue({
	el: "#app",
	router,
	store,
	render: h => h(App)
});