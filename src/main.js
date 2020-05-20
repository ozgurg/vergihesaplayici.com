import Vue from "vue";
import App from "./modules/App.vue";
import Buefy from "buefy";
import VueMeta from "vue-meta";
import VueLazyload from "vue-lazyload";
import router from "./_router";
import store from "./_store";
import "./_service-worker";
import "./api/api.firebase";


// Buefy
Vue.use(Buefy, {
	defaultUseHtml5Validation: false,
	defaultIconPack: "mdi"
});

// Vue meta
Vue.prototype.VueMetaTemplate = "%s - Vergi Hesaplayıcı";
Vue.use(VueMeta);

// Vue lazy load
Vue.use(VueLazyload);

// Vue configuration
Vue.config.productionTip = false;

// Vue instance
new Vue({
	el: "#app",
	router,
	store,
	render: h => h(App)
});