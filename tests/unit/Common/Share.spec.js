import {shallowMount} from "@vue/test-utils";
import Vue from "vue";
import Buefy from "buefy";
import Share from "../../../src/modules/Common/components/Share";

// Buefy
Vue.use(Buefy);


it("generate share URL by given data", () => {
	const data = "thisWillBeCopied";
	const $route = {
		path: "/test/mock/path"
	};

	const wrapper = shallowMount(Share, {
		propsData: {
			data
		},
		mocks: {
			$route
		}
	});

	expect(wrapper.find("#shareUrl").attributes().value)
		.toMatch(`${process.env.VUE_APP_BASE_URL}${$route.path}?data=${data}`);
});