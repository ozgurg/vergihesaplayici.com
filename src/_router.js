import Vue from "vue";
import VueRouter from "vue-router";
import store from "./_store";


Vue.use(VueRouter);

const routes = [
	{
		name: "home",
		path: "/",
		component: () => import(
			/* webpackChunkName: "index" */
			"./modules/Index/pages/Index"
		),
		meta: {
			title: "Ana Sayfa",
			desc: "Türkiye'deki farklı ürün gruplarının yurt dışı fiyatlarına ne kadar vergi uygulandığı hesaplayın."
		}
	},
	{
		name: "hesaplayicilar/telefon-vergisi-hesaplayici",
		path: "/hesaplayicilar/telefon-vergisi-hesaplayici",
		component: () => import(
			/* webpackChunkName: "hesaplayicilar/telefon-vergisi-hesaplayici" */
			"./modules/TelefonVergisiHesaplayici/pages/TelefonVergisiHesaplayici"
		),
		meta: {
			title: "Telefon Vergisi Hesaplayıcı",
			desc: "Satın aldığınız bir telefonun satış fiyatına etki eden vergileri hesaplayın.",
			icon: "cellphone"
		}
	}
];

const router = new VueRouter({
	mode: "history",
	base: process.env.BASE_URL,
	routes
});

router.beforeEach((to, from, next) => {
	store.commit("isLoading", true);
	next();
});

router.afterEach((to, from) => {
	store.commit("isLoading", false);
});


export default router;