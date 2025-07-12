import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { CalculatorPages as calculatorPages } from "@/domains/hesaplayicilar/db.js";
import CalculatorCardItem from "@/components/calculator-card-item.vue";
import CalculatorsGrid from "@/components/calculators-grid.vue";

describe("components/calculators-grid.vue", () => {
    it("renders all calculator pages as `<calculator-card-item />`", () => {
        const wrapper = mount(CalculatorsGrid);

        const calculatorCardItems = wrapper.findAllComponents(CalculatorCardItem);

        expect(calculatorCardItems.length).toBe(calculatorPages.length);

        for (const [_index, _calculatorCardItem] of calculatorCardItems.entries()) {
            const item = calculatorPages[_index]!;
            expect(_calculatorCardItem.props()).toEqual({
                title: item.title,
                description: item.summary,
                url: item.url,
                icon: item.icon
            });
        }
    });
});
