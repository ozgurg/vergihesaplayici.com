import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import { testAttrPassingToRoot, testRootClass } from "@root/__test__/utils.js";
import { getCalculatorPages } from "@/domains/hesaplayicilar/db.js";
import CalculatorCardItem from "@/components/calculator-card-item.vue";
import Drawer from "@/components/drawer.vue";

const CALCULATOR_PAGES = getCalculatorPages();

describe("components/drawer.vue", () => {
    testAttrPassingToRoot(Drawer, { props: { id: "passed-id" } });
    testRootClass(Drawer, "drawer", { props: { id: "passed-id" } });

    it("uses passed `id`", () => {
        const testId = "test-drawer";
        const wrapper = mount(Drawer, {
            props: { id: testId }
        });
        expect(wrapper.attributes("id")).toBe(testId);
    });

    it("renders all calculator pages as `<calculator-card-item />`", () => {
        const testId = "test-drawer";
        const wrapper = mount(Drawer, {
            props: { id: testId }
        });

        const calculatorCardItems = wrapper.findAllComponents(CalculatorCardItem);

        expect(calculatorCardItems.length).toBe(CALCULATOR_PAGES.length);

        for (const [_index, _calculatorCardItem] of calculatorCardItems.entries()) {
            const calculatorPage = CALCULATOR_PAGES[_index]!;
            expect(_calculatorCardItem.props()).toEqual({
                title: calculatorPage.title,
                description: calculatorPage.summary,
                url: calculatorPage.url,
                icon: calculatorPage.icon
            });
        }
    });
});
