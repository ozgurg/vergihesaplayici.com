import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { testAttrPassingToRoot, testDefaultSlot, testRootClass } from "@root/__test__/utils.js";
import FormLabel from "@/components/common/form/form-label.vue";

describe("components/common/form/form-label.vue", () => {
    testDefaultSlot(FormLabel);
    testAttrPassingToRoot(FormLabel);
    testRootClass(FormLabel, "form-label");

    it("renders correctly with default tag", () => {
        const wrapper = mount(FormLabel);
        expect(wrapper.element.tagName).toBe("LABEL");
    });

    it("renders with custom tag when `is` is passed", () => {
        const wrapper = mount(FormLabel, {
            props: { is: "legend" }
        });
        expect(wrapper.element.tagName).toBe("LEGEND");
    });

    it("applies `id` if passed", () => {
        const testId = "test-id";
        const wrapper = mount(FormLabel, {
            props: { id: testId }
        });
        expect(wrapper.attributes("id")).toBe(testId);
    });

    it("applies injected `form-group.id` as `id` if `id` is not passed", () => {
        const testFormGroupId = "test-form-group";
        const wrapper = mount(FormLabel, {
            global: {
                provide: {
                    "form-group.id": testFormGroupId
                }
            }
        });
        expect(wrapper.attributes("id")).toBe(testFormGroupId);
    });
});
