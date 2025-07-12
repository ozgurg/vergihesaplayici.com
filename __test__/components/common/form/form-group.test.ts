import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { testAttrPassingToRoot, testRootClass } from "@root/__test__/utils.js";
import FormLabel from "@/components/common/form/form-label.vue";
import FormGroup from "@/components/common/form/form-group.vue";

describe("components/common/form/form-group.vue", () => {
    testAttrPassingToRoot(FormGroup);
    testRootClass(FormGroup, "form-group");

    it("renders a `<form-label />` as `<legend />` when `label` is passed", () => {
        const testLabel = "Test Label";
        const wrapper = mount(FormGroup, {
            props: {
                label: testLabel
            }
        });

        const formLabel = wrapper.findComponent(FormLabel);
        expect(formLabel.exists()).toBeTruthy();
        expect(formLabel.element.tagName).toBe("LEGEND");
        expect(formLabel.text()).toBe(testLabel);
    });

    it("renders `default` slot inside `.form-group-content`", () => {
        const defaultSlot = "<div>Default Slot Content</div>";
        const wrapper = mount(FormGroup, {
            slots: {
                default: defaultSlot
            }
        });

        expect(wrapper.find(".form-group-content").exists()).toBeTruthy();
        expect(wrapper.find(".form-group-content div").text()).toBe("Default Slot Content");
    });

    it("renders `label` slot when `label` is not passed", () => {
        const wrapper = mount(FormGroup, {
            slots: {
                label: `<div class="label-slot-content">Label Slot Content</div>`
            }
        });

        const formLabel = wrapper.findComponent(FormLabel);
        expect(formLabel.exists()).toBeFalsy();

        const labelSlotContent = wrapper.find(".label-slot-content");
        expect(labelSlotContent.exists()).toBeTruthy();
        expect(labelSlotContent.text()).toBe("Label Slot Content");
    });
});
