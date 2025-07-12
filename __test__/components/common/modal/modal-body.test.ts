import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import { testAttrPassingToRoot, testDefaultSlot } from "@root/__test__/utils.js";
import ModalBody from "@/components/common/modal/modal-body.vue";

describe("components/common/modal/modal-body.vue", () => {
    testDefaultSlot(ModalBody);
    testAttrPassingToRoot(ModalBody);

    it("uses injected `tabs.modelValue`", () => {
        const testTabsModelValue = "test-tabs-model-value";
        const wrapper = mount(ModalBody, {
            global: {
                provide: {
                    "tabs.modelValue": testTabsModelValue
                }
            }
        });
        // @ts-expect-error: FIXME
        expect(wrapper.vm.tabsModelValue).toBe(testTabsModelValue);
    });

    it("uses default `tabs.modelValue` if not injected", () => {
        const wrapper = mount(ModalBody);
        // @ts-expect-error: FIXME
        expect(wrapper.vm.tabsModelValue).toBeUndefined();
    });
});
