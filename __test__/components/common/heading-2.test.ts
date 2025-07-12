import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { testAttrPassingToRoot, testDefaultSlot, testRootClass } from "@root/__test__/utils.js";
import Heading2 from "@/components/common/heading-2.vue";

describe("components/common/heading-2.vue", () => {
    testDefaultSlot(Heading2);
    testAttrPassingToRoot(Heading2);
    testRootClass(Heading2, "heading-2");

    it("renders correctly with default tag", () => {
        const wrapper = mount(Heading2);
        expect(wrapper.element.tagName).toBe("H2");
    });

    it("renders with custom tag if `is` is set", () => {
        const wrapper = mount(Heading2, {
            props: { is: "h6" }
        });
        expect(wrapper.element.tagName).toBe("H6");
    });
});
