import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { testAttrPassingToRoot, testRootClass } from "@root/__test__/utils.js";
import StringCarousel from "@/components/common/string-carousel.vue";
import CalculatorResultListItem from "@/components/calculator-result-list-item.vue";

describe("components/calculator-result-list-item.vue", () => {
    testAttrPassingToRoot(CalculatorResultListItem, {
        props: {
            label: "Tax Free Price",
            value: "100"
        }
    });
    testRootClass(CalculatorResultListItem, "calculator-result-list-item", {
        props: {
            label: "Tax Free Price",
            value: "100"
        }
    });

    it("renders label and value correctly", () => {
        const testProps = {
            label: "Total Tax (50%)",
            value: "100"
        };
        const wrapper = mount(CalculatorResultListItem, {
            props: testProps
        });

        const dtStringCarousel = wrapper.find("dt").findComponent(StringCarousel);
        expect(dtStringCarousel.exists()).toBeTruthy();
        expect(dtStringCarousel.props("text")).toBe(testProps.label);

        const ddStringCarousel = wrapper.find("dd").findComponent(StringCarousel);
        expect(ddStringCarousel.exists()).toBeTruthy();
        expect(ddStringCarousel.props("text")).toBe(testProps.value);
    });

    it("renders label as it is if it does not contains any number", () => {
        const testProps = {
            label: "Tax Free Price",
            value: ""
        };
        const wrapper = mount(CalculatorResultListItem, {
            props: testProps
        });

        const dt = wrapper.find("dt");
        expect(dt.text()).toBe(testProps.label);
    });

    it("applies a `variant` class", () => {
        const testProps = {
            label: "Tax Free Price",
            value: "100",
            variant: "tax-free-price"
        };
        const wrapper = mount(CalculatorResultListItem, {
            // @ts-expect-error: FIXME
            props: testProps
        });

        expect(wrapper.classes()).toContain("calculator-result-list-item-variant-tax-free-price");
    });

    it("does not apply any variant class when `variant` is not passed", () => {
        const testProps = {
            label: "Tax Free Price",
            value: "100"
        };
        const wrapper = mount(CalculatorResultListItem, {
            props: testProps
        });
        expect(wrapper.attributes("class")).toBe("calculator-result-list-item");
    });

    it("applies or not applies `muted` class", () => {
        const wrapper1 = mount(CalculatorResultListItem, {
            props: {
                label: "Tax Free Price",
                value: "100",
                variant: "tax-free-price"
            }
        });
        expect(wrapper1.classes()).not.toContain("calculator-result-list-item-muted");

        const wrapper2 = mount(CalculatorResultListItem, {
            props: {
                label: "Tax Free Price",
                value: "100",
                variant: "tax-free-price",
                isMuted: false
            }
        });
        expect(wrapper2.classes()).not.toContain("calculator-result-list-item-muted");

        const wrapper3 = mount(CalculatorResultListItem, {
            props: {
                label: "Tax Free Price",
                value: "100",
                variant: "tax-free-price",
                isMuted: true
            }
        });
        expect(wrapper3.classes()).toContain("calculator-result-list-item-muted");
    });
});
