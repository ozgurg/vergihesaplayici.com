import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { getCalculatorPages } from "@/domains/hesaplayicilar/db.js";
import CalculatorCardItem from "@/components/calculator-card-item.vue";
import CalculatorsGrid from "@/components/calculators-grid.vue";

describe("components/calculators-grid.vue", () => {
    it("renders all calculator pages as `<calculator-card-item />`", () => {
        const calculatorPages = getCalculatorPages();

        const wrapper = mount(CalculatorsGrid, { props: { items: calculatorPages, titleTag: "h3" } });

        const calculatorCardItems = wrapper.findAllComponents(CalculatorCardItem as any);

        expect(calculatorCardItems.length).toBe(calculatorPages.length);

        for (const [_index, _calculatorCardItem] of calculatorCardItems.entries()) {
            const item = calculatorPages[_index]!;
            expect((_calculatorCardItem as any).props()).toEqual({
                title: item.title,
                titleTag: "h3",
                description: item.summary,
                url: item.url,
                icon: item.icon
            });
        }
    });
});
