import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { testAttrPassingToRoot, testRootClass } from "@root/__test__/utils.js";
import CalculatorResultListItem from "@/components/calculator-result-list-item.vue";
import CalculatorResultListItemDetails from "@/components/calculator-result-list-item-details.vue";
import CalculatorResultList from "@/components/calculator-result-list.vue";

const TEST_ITEMS = [
    { key: "taxFree", label: "Tax Free Price", value: "100", variant: "tax-free-price", isMuted: false },
    { key: "total", label: "Total Tax", value: "20", variant: "total-tax", isMuted: true },
    { key: "taxAdded", label: "Tax Added Price", value: "120", variant: "tax-added-price" }
];

const DEFAULT_OPTIONS = {
    props: {
        items: TEST_ITEMS
    }
};

describe("components/calculator-result-list.vue", () => {
    testAttrPassingToRoot(CalculatorResultList, DEFAULT_OPTIONS);
    testRootClass(CalculatorResultList, "calculator-result-list", DEFAULT_OPTIONS);

    it("renders given items as `<calculator-result-list-item />`", () => {
        // @ts-expect-error: FIXME
        const wrapper = mount(CalculatorResultList, DEFAULT_OPTIONS);

        const calculatorResultListItems = wrapper.findAllComponents(CalculatorResultListItem as any);

        expect(calculatorResultListItems).toHaveLength(TEST_ITEMS.length);

        for (const [_index, _calculatorResultListItem] of calculatorResultListItems.entries()) {
            const item = TEST_ITEMS[_index]!;
            expect((_calculatorResultListItem as any).props()).toEqual({
                label: item.label,
                value: item.value,
                variant: item.variant,
                isMuted: item.isMuted || false
            });
        }
    });

    it("has `aria-label`", () => {
        // @ts-expect-error: FIXME
        const wrapper = mount(CalculatorResultList, DEFAULT_OPTIONS);
        expect(wrapper.attributes("aria-label")).toBeTruthy();
    });

    it("renders items with details as `<calculator-result-list-item-details />`", () => {
        const detailsItems = [
            {
                key: "taxFree",
                label: "Tax Free Price",
                value: "100",
                details: [{ key: "base", label: "Base", value: "100" }]
            }
        ];
        const wrapper = mount(CalculatorResultList, {
            props: {
                items: detailsItems as any
            }
        });

        const detailsComponent = wrapper.findComponent(CalculatorResultListItemDetails as any);
        expect(detailsComponent.exists()).toBeTruthy();
        expect(detailsComponent.props("label")).toBe("Tax Free Price");
        expect(detailsComponent.props("value")).toBe("100");
        expect(detailsComponent.props("details")).toEqual([{ key: "base", label: "Base", value: "100" }]);
    });
});
