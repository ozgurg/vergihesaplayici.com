import Vue from "vue";
import VueRouter from "vue-router";
import store from "./store/_index";


Vue.use(VueRouter);

const routes = [
	{
		name: "index",
		path: "/",
		component: () => import(
			/* webpackChunkName: "index" */
			"./modules/Index/Index"),
		meta: {
			title: "Vergi Hesaplayıcı",
			desc: "Türkiye'deki farklı ürün gruplarının yurt dışı fiyatlarına ne kadar vergi uygulandığı hesaplayın."
		}
	},
	{
		name: "hesaplayicilar/telefon-vergisi-hesaplayici",
		path: "/hesaplayicilar/telefon-vergisi-hesaplayici",
		component: () => import(
			/* webpackChunkName: "telefon-vergisi-hesaplayici" */
			"./modules/PhoneTaxCalculator/PhoneTaxCalculator"),
		meta: {
			title: "Telefon Vergisi Hesaplayıcı",
			desc: "Satın aldığınız bir telefonun satış fiyatına etki eden vergileri hesaplayın.",
			icon: "cellphone"
		}
	},
	{
		name: "hesaplayicilar/konsol-vergisi-hesaplayici",
		path: "/hesaplayicilar/konsol-vergisi-hesaplayici",
		component: () => import(
			/* webpackChunkName: "konsol-vergisi-hesaplayici" */
			"./modules/ConsoleTaxCalculator/ConsoleTaxCalculator"),
		meta: {
			title: "Konsol Vergisi Hesaplayıcı",
			desc: "Sadece eğlenmek istediğinizde ödemeniz gereken vergileri hesaplayın.",
			icon: "gamepad"
		}
	},
	{
		path: "*",
		beforeEnter(to, from, next) {
			next({ name: "index" });
		}
	}
];

const router = new VueRouter({
	mode: "history",
	base: process.env.BASE_URL,
	routes
});

router.beforeEach((to, from, next) => {
	store.dispatch("setIsLoading", true).then(() => {
	});
	next();
});

router.afterEach((to, from) => {
	store.dispatch("setIsLoading", false).then(() => {
	});
});


export default router;