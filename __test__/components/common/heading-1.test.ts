import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { testAttrPassingToRoot, testDefaultSlot, testRootClass } from "@root/__test__/utils.js";
import Heading1 from "@/components/common/heading-1.vue";

describe("components/common/heading-1.vue", () => {
    testDefaultSlot(Heading1);
    testAttrPassingToRoot(Heading1);
    testRootClass(Heading1, "heading-1");

    it("renders correctly with default tag", () => {
        const wrapper = mount(Heading1);
        expect(wrapper.element.tagName).toBe("H1");
    });

    it("renders with custom tag if `is` is set", () => {
        const wrapper = mount(Heading1, {
            props: { is: "h6" }
        });
        expect(wrapper.element.tagName).toBe("H6");
    });
});
