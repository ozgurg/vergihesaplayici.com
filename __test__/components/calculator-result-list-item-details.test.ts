import { type DOMWrapper, mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { testAttrPassingToRoot, testRootClass } from "@root/__test__/utils.js";
import StringCarousel from "@/components/common/string-carousel.vue";
import CalculatorResultListItemDetails from "@/components/calculator-result-list-item-details.vue";

describe("components/calculator-result-list-item-details.vue", () => {
    testAttrPassingToRoot(CalculatorResultListItemDetails, {
        props: {
            label: "Tax Free Price",
            value: "100",
            details: []
        }
    });
    testRootClass(CalculatorResultListItemDetails, "calculator-result-list-item", {
        props: {
            label: "Tax Free Price",
            value: "100",
            details: []
        }
    });

    it("renders label, value and each details correctly", () => {
        const testDetails = [
            { label: "label 1", value: "value 1" },
            { label: "label 2", value: "value 2" }
        ];
        const testProps = {
            label: "Total Tax (50%)",
            value: "100",
            details: testDetails
        };
        const wrapper = mount(CalculatorResultListItemDetails, {
            props: testProps
        });

        const labelStringCarousel = wrapper.find(".header-label").findComponent(StringCarousel as any);
        expect(labelStringCarousel.exists()).toBeTruthy();
        expect((labelStringCarousel as any).props("text")).toBe(testProps.label);

        const valueStringCarousel = wrapper.find(".header-value").findComponent(StringCarousel as any);
        expect(valueStringCarousel.exists()).toBeTruthy();
        expect((valueStringCarousel as any).props("text")).toBe(testProps.value);

        const details = wrapper.findAll(".detail") as DOMWrapper<HTMLDivElement>[];
        expect(details.length).toBe(testDetails.length);
        for (const [_index, _detail] of details.entries()) {
            expect(_detail.find(".detail-label").text()).toBe(testDetails[_index]!.label);
            expect(_detail.find(".detail-value").text()).toBe(testDetails[_index]!.value);
        }
    });

    it("renders label as it is if it does not contains any number", () => {
        const testProps = {
            label: "Tax Free Price",
            value: "",
            details: []
        };
        const wrapper = mount(CalculatorResultListItemDetails, {
            props: testProps
        });

        const label = wrapper.find(".header-label");
        expect(label.text()).toBe(testProps.label);
    });

    it("applies a `variant` class", () => {
        const testProps = {
            label: "Tax Free Price",
            value: "100",
            details: [],
            variant: "tax-free-price"
        };
        const wrapper = mount(CalculatorResultListItemDetails, {
            // @ts-expect-error: FIXME
            props: testProps
        });

        expect(wrapper.classes()).toContain("calculator-result-list-item--variant-tax-free-price");
    });

    it("does not apply any variant class when `variant` is not passed", () => {
        const testProps = {
            label: "Tax Free Price",
            value: "100",
            details: []
        };
        const wrapper = mount(CalculatorResultListItemDetails, {
            props: testProps
        });
        expect(wrapper.attributes("class")).toBe("calculator-result-list-item");
    });

    it("applies or not applies `muted` class", () => {
        const wrapper1 = mount(CalculatorResultListItemDetails, {
            props: {
                label: "Tax Free Price",
                value: "100",
                details: [],
                variant: "tax-free-price"
            }
        });
        expect(wrapper1.classes()).not.toContain("calculator-result-list-item--muted");

        const wrapper2 = mount(CalculatorResultListItemDetails, {
            props: {
                label: "Tax Free Price",
                value: "100",
                details: [],
                variant: "tax-free-price",
                isMuted: false
            }
        });
        expect(wrapper2.classes()).not.toContain("calculator-result-list-item--muted");

        const wrapper3 = mount(CalculatorResultListItemDetails, {
            props: {
                label: "Tax Free Price",
                value: "100",
                details: [],
                variant: "tax-free-price",
                isMuted: true
            }
        });
        expect(wrapper3.classes()).toContain("calculator-result-list-item--muted");
    });
});
