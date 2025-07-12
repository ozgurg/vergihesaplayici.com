import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import { testAttrPassingToRoot, testRootClass } from "@root/__test__/utils.js";
import ModalCloseButton from "@/components/common/modal/modal-close-button.vue";

describe("components/common/modal/modal-close-button.vue", () => {
    testAttrPassingToRoot(ModalCloseButton);
    testRootClass(ModalCloseButton, "modal-close-button");

    it("has correct attrs", () => {
        const wrapper = mount(ModalCloseButton);
        expect(wrapper.attributes("aria-label")).toBeTruthy();
        expect(wrapper.attributes("tabindex")).toBe("0");
    });
});
