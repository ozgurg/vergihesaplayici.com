import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { testAttrPassingToRoot, testRootClass } from "@root/__test__/utils.js";
import StringCarousel2 from "@/components/common/string-carousel2.vue";

describe("components/common/string-carousel2.vue", () => {
    testAttrPassingToRoot(StringCarousel2, { props: { text: "Türkiye" } });
    testRootClass(StringCarousel2, "string-carousel2", { props: { text: "Türkiye" } });

    it("renders chars of given text", () => {
        const testText = "Türkiye";
        const wrapper = mount(StringCarousel2, {
            props: { text: testText }
        });

        const charElements = wrapper.findAll(".string-carousel2-wrapper > span");

        expect(charElements).toHaveLength(testText.length);

        for (const [_index, _charElement] of charElements.entries()) {
            const char = testText[_index];
            expect(_charElement.text()).toBe(char);
        }
    });

    it("handles text with spaces correctly", () => {
        const testText = "Türkiye Cumhuriyeti";
        const wrapper = mount(StringCarousel2, {
            props: { text: testText }
        });

        const spans = wrapper.findAll(".string-carousel2-wrapper > span");
        expect(spans).toHaveLength(testText.length);
        expect(spans[7]!.html()).toContain("&nbsp;");
    });

    it("renders a visually hidden text with full text", () => {
        const testText = "Türkiye Cumhuriyeti";
        const wrapper = mount(StringCarousel2, {
            props: { text: testText }
        });

        const visuallyHiddenText = wrapper.find(".visually-hidden");
        expect(visuallyHiddenText.exists()).toBeTruthy();
        expect(visuallyHiddenText.text()).toBe(testText);
    });

    it("renders correctly with default tag", () => {
        const wrapper = mount(StringCarousel2, {
            props: { text: "Türkiye" }
        });
        expect(wrapper.element.tagName).toBe("DIV");
    });

    it("renders correct tag based on `is`", () => {
        const wrapper = mount(StringCarousel2, {
            props: {
                text: "Türkiye",
                is: "section"
            }
        });
        expect(wrapper.element.tagName).toBe("SECTION");
    });
});
