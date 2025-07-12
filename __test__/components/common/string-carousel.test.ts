import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { testAttrPassingToRoot, testRootClass } from "@root/__test__/utils.js";
import StringCarouselDigit from "@/components/common/string-carousel-digit.vue";
import StringCarousel from "@/components/common/string-carousel.vue";

describe("components/common/string-carousel.vue", () => {
    testAttrPassingToRoot(StringCarousel, { props: { text: "Türkiye" } });
    testRootClass(StringCarousel, "string-carousel", { props: { text: "Türkiye" } });

    it("renders text correctly", () => {
        const nonDigits = "AB";
        const digits = "012";
        const testText = `${nonDigits}${digits}`;

        const wrapper = mount(StringCarousel, {
            props: { text: testText }
        });

        const nonDigitSpans = wrapper.findAll(".string-carousel-wrapper > span");
        expect(nonDigitSpans).toHaveLength(nonDigits.length);
        for (const [_index, _nonDigitSpan] of nonDigitSpans.entries()) {
            const char = nonDigits[_index];
            expect(_nonDigitSpan.text()).toBe(char);
        }

        const digitComponents = wrapper.findAllComponents(StringCarouselDigit);
        expect(digitComponents).toHaveLength(digits.length);
        for (const [_index, _digitComponent] of digitComponents.entries()) {
            const char = digits[_index];
            expect(_digitComponent.props("digit")).toBe(char);
            expect(_digitComponent.find(`div[aria-current="true"]`).exists()).toBeTruthy();
            expect(_digitComponent.find(`div[aria-current="true"]`).text()).toBe(char);
        }
    });

    it("renders a visually hidden text with full text", () => {
        const testText = "Türkiye Cumhuriyeti";
        const wrapper = mount(StringCarousel, {
            props: { text: testText }
        });

        const visuallyHiddenText = wrapper.find(".visually-hidden");
        expect(visuallyHiddenText.exists()).toBeTruthy();
        expect(visuallyHiddenText.text()).toBe(testText);
    });

    it("renders correctly with default tag", () => {
        const wrapper = mount(StringCarousel, {
            props: { text: "Türkiye" }
        });
        expect(wrapper.element.tagName).toBe("DIV");
    });

    it("renders correct tag based on `is`", () => {
        const wrapper = mount(StringCarousel, {
            props: {
                text: "Türkiye",
                is: "section"
            }
        });
        expect(wrapper.element.tagName).toBe("SECTION");
    });
});
