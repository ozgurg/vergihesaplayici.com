import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { testAttrPassingToRoot, testRootClass } from "@root/__test__/utils.js";
import StringCarouselDigit from "@/components/common/string-carousel-digit.vue";

describe("components/common/string-carousel-digit.vue", () => {
    testAttrPassingToRoot(StringCarouselDigit, { props: { digit: 0 } });
    testRootClass(StringCarouselDigit, "string-carousel-digit", { props: { digit: 0 } });

    it("renders digit passed in props", () => {
        const testDigit = "3";
        const wrapper = mount(StringCarouselDigit, {
            props: { digit: testDigit }
        });

        const currentDigit = wrapper.find(`div[aria-current="true"]`);
        expect(currentDigit.exists()).toBeTruthy();
        expect(currentDigit.text()).toBe(testDigit);
    });

    it("applies `aria-current=\"true\"` only to correct digit", () => {
        const testDigit = "3";
        const wrapper = mount(StringCarouselDigit, {
            props: { digit: testDigit }
        });

        const digits = wrapper.findAll("div[aria-current]");
        for (const _digit of digits.values()) {
            if (_digit.text() === testDigit) {
                expect(_digit.attributes("aria-current")).toBe("true");
            } else {
                expect(_digit.attributes("aria-current")).toBe("false");
            }
        }
    });

    it("renders all digits from 0 to 9", () => {
        const wrapper = mount(StringCarouselDigit, {
            props: { digit: "0" }
        });

        const digits = wrapper.findAll("div[aria-current]");
        expect(digits.length).toBe(10);
        for (const [_index, _digit] of digits.entries()) {
            expect(_digit.text()).toBe(_index.toString());
        }
    });
});
