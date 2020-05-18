import {shallowMount} from "@vue/test-utils";
import Hero from "../../../src/modules/Common/components/Hero";


it("render 'title'", () => {
	const title = "Test title";

	const wrapper = shallowMount(Hero, {
		propsData: {
			title
		}
	});

	expect(wrapper.find(".hero-body .title").text()).toMatch(title);
});

it("render 'description'", () => {
	const description = "Test description";

	const wrapper = shallowMount(Hero, {
		propsData: {
			description
		}
	});

	expect(wrapper.find(".hero-body .subtitle").text()).toMatch(description);
});

it("render 'title' - 'description'", () => {
	const title = "Test title";
	const description = "Test description";

	const wrapper = shallowMount(Hero, {
		propsData: {
			title,
			description
		}
	});

	expect(wrapper.find(".hero-body .title").text()).toMatch(title);
	expect(wrapper.find(".hero-body .subtitle").text()).toMatch(description);
});