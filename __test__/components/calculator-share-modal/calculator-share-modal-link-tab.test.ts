import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import { testAttrPassingToRoot } from "@root/__test__/utils.js";
import CalculatorShareModalLinkTab from "@/components/calculator-share-modal/calculator-share-modal-link-tab.vue";

const TEST_URL = new URL("https://vergihesaplayici.com");
const TEST_OPTIONS = {
    props: {
        url: TEST_URL
    }
};

describe("components/calculator-share-modal/calculator-share-modal-link-tab.vue", () => {
    const createWrapper = () => {
        return mount(CalculatorShareModalLinkTab, TEST_OPTIONS);
    };

    testAttrPassingToRoot(CalculatorShareModalLinkTab, TEST_OPTIONS);

    it("has the correct `role` attr", () => {
        const wrapper = createWrapper();
        expect(wrapper.attributes("role")).toBe("region");
    });

    it("provides `url`", () => {
        // It's not very solid, but it'll do for now
        const wrapper = createWrapper();
        expect(wrapper.vm.url).toBe(TEST_URL);
    });

    it("updates share URLs when `url` prop", async () => {
        // It's not very solid, but it'll do for now

        const wrapper = createWrapper();
        const newUrl = new URL("https://vergihesaplamayici.com");

        // @ts-expect-error: FIXME
        const beforeFacebookShareUrl = wrapper.vm.facebookShareUrl;

        await wrapper.setProps({ url: newUrl });
        await wrapper.vm.$nextTick();

        // @ts-expect-error: FIXME
        expect(wrapper.vm.facebookShareUrl).not.toBe(beforeFacebookShareUrl);
    });
});
