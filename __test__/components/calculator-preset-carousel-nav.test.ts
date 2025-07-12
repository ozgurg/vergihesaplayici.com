import type { DOMWrapper } from "@vue/test-utils";
import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import CalculatorPresetCarouselNav from "@/components/calculator-preset-carousel-nav.vue";

const TEST_CAROUSEL_ID = "carousel-1";

describe("components/calculator-preset-carousel-nav.vue", () => {
    it("renders previous button with correct attrs", () => {
        const wrapper = mount(CalculatorPresetCarouselNav, {
            props: {
                ariaControls: TEST_CAROUSEL_ID
            }
        });

        const prevButton = wrapper.find(".calculator-preset-carousel-nav-prev") as DOMWrapper<HTMLButtonElement>;
        expect(prevButton.exists()).toBeTruthy();
        expect(prevButton.attributes("aria-controls")).toBe(TEST_CAROUSEL_ID);
        expect(prevButton.attributes("aria-label")).toBeTruthy();
        expect(prevButton.element.disabled).toBeTruthy();
        expect(prevButton.attributes("tabindex")).toBe("-1");
    });

    it("renders next button with correct attrs", () => {
        const wrapper = mount(CalculatorPresetCarouselNav, {
            props: {
                ariaControls: TEST_CAROUSEL_ID
            }
        });

        const nextButton = wrapper.find(".calculator-preset-carousel-nav-next") as DOMWrapper<HTMLButtonElement>;
        expect(nextButton.exists()).toBeTruthy();
        expect(nextButton.attributes("aria-controls")).toBe(TEST_CAROUSEL_ID);
        expect(nextButton.attributes("aria-label")).toBeTruthy();
        expect(nextButton.element.disabled).toBeFalsy();
        expect(nextButton.attributes("tabindex")).toBe("-1");
    });
});
