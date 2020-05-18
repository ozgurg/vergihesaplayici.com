import Vue from "vue";
import Vuex from "vuex";
import Core from "./modules/Common/store/_index";


Vue.use(Vuex);


export default new Vuex.Store({
	modules: {
		Core
	}
});