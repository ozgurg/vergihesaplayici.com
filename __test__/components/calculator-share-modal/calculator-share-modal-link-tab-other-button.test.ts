import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import { testAttrPassingToRoot } from "@root/__test__/utils.js";
import FormButton from "@/components/common/form/form-button.vue";
import CalculatorShareModalLinkTabOtherButton
    from "@/components/calculator-share-modal/calculator-share-modal-link-tab-other-button.vue";

const TEST_URL = new URL("https://vergihesaplayici.com");
const TEST_OPTIONS = {
    global: {
        provide: {
            url: TEST_URL
        }
    }
};

describe("components/calculator-share-modal/calculator-share-modal-link-tab-other-button", () => {
    testAttrPassingToRoot(CalculatorShareModalLinkTabOtherButton, TEST_OPTIONS);

    it("has `aria-label` attr", () => {
        const wrapper = mount(CalculatorShareModalLinkTabOtherButton, TEST_OPTIONS);
        expect(wrapper.attributes("aria-label")).toBeTruthy();
    });

    it("should be a <button />`", () => {
        const wrapper = mount(CalculatorShareModalLinkTabOtherButton, TEST_OPTIONS);
        expect(wrapper.element.tagName).toBe("BUTTON");
    });

    it("is enabled by default", () => {
        const wrapper = mount(CalculatorShareModalLinkTabOtherButton, TEST_OPTIONS);

        const formButton = wrapper.findComponent(FormButton);
        expect(formButton.props("disabled")).toBeFalsy();
        expect(formButton.props("loading")).toBeFalsy();

        expect(wrapper.vm.isLoading).toBeFalsy();
    });
});
