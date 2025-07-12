import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { testAttrPassingToRoot, testDefaultSlot, testRootClass } from "@root/__test__/utils.js";
import Heading3 from "@/components/common/heading-3.vue";

describe("components/common/heading-3.vue", () => {
    testDefaultSlot(Heading3);
    testAttrPassingToRoot(Heading3);
    testRootClass(Heading3, "heading-3");

    it("renders correctly with default tag", () => {
        const wrapper = mount(Heading3);
        expect(wrapper.element.tagName).toBe("H3");
    });

    it("renders with custom tag if `is` is set", () => {
        const wrapper = mount(Heading3, {
            props: { is: "h6" }
        });
        expect(wrapper.element.tagName).toBe("H6");
    });
});
