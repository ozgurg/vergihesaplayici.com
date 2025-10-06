import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { testAttrPassingToRoot, testDefaultSlot, testRootClass } from "@root/__test__/utils.js";
import Spinner from "@/components/common/spinner.vue";
import FormButton from "@/components/common/form/form-button.vue";

describe("components/common/form/form-button.vue", () => {
    testDefaultSlot(FormButton);
    testAttrPassingToRoot(FormButton);
    testRootClass(FormButton, "form-button");

    it("renders correctly with default tag", () => {
        const wrapper = mount(FormButton);
        expect(wrapper.element.tagName).toBe("BUTTON");
    });

    it("renders as `<a />` when `href` is passed", () => {
        const testHref = new URL("https://vergihesaplayici.com");
        const wrapper = mount(FormButton, {
            props: { href: testHref }
        });
        expect(wrapper.element.tagName).toBe("A");
        expect(wrapper.attributes("href")).toBe(testHref.href);
    });

    it("shows `<spinner />` when `loading` is `true`", () => {
        const wrapper = mount(FormButton, {
            props: { loading: true }
        });
        expect(wrapper.findComponent(Spinner).exists()).toBeTruthy();
        expect(wrapper.find(".form-button-content").exists()).toBeFalsy();
        expect(wrapper.attributes("aria-busy")).toBe("true");
    });

    it("disables button when `disabled` is `true`", () => {
        const wrapper = mount(FormButton, {
            props: { disabled: true }
        });
        expect(wrapper.element.disabled).toBeTruthy();
        expect(wrapper.attributes("aria-disabled")).toBe("true");
    });

    it("applies `variant`, `color`, and `scale` classes", () => {
        const wrapper = mount(FormButton, {
            props: { variant: "outlined", color: "danger", scale: "small" }
        });
        expect(wrapper.classes()).toContain("form-button-variant-outlined");
        expect(wrapper.classes()).toContain("form-button-color-danger");
        expect(wrapper.classes()).toContain("form-button-scale-small");
    });
});
