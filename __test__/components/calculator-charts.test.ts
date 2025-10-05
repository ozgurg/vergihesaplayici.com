import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { testAttrPassingToRoot, testRootClass } from "@root/__test__/utils.js";
import Heading3 from "@/components/common/heading-3.vue";
import CalculatorPieChart from "@/components/calculator-pie-chart.vue";
import CalculatorCharts from "@/components/calculator-charts.vue";

describe("components/calculator-charts.vue", () => {
    const TEST_CHARTS = [
        {
            title: "Chart A",
            props: {
                items: [
                    { value: 60, label: "A1" },
                    { value: 40, label: "A2" }
                ]
            }
        },
        {
            title: "Chart B",
            props: {
                items: [
                    { value: 30, label: "B1" },
                    { value: 70, label: "B2" }
                ]
            }
        }
    ];

    testRootClass(CalculatorCharts, "calculator-charts", { props: { charts: TEST_CHARTS } });
    testAttrPassingToRoot(CalculatorCharts, { props: { charts: TEST_CHARTS } });

    it("renders given charts with titles", () => {
        const wrapper = mount(CalculatorCharts, {
            props: {
                charts: TEST_CHARTS
            }
        });

        const items = wrapper.findAll(".calculator-charts-item");
        expect(items.length).toBe(TEST_CHARTS.length);

        const headings = wrapper.findAllComponents(Heading3);
        expect(headings.length).toBe(TEST_CHARTS.length);
        for (const [_index, _heading] of headings.entries()) {
            expect(_heading.text()).toBe(TEST_CHARTS[_index]!.title);
        }
    });

    it("passes down props to `<calculator-pie-chart />`", () => {
        const wrapper = mount(CalculatorCharts, {
            props: {
                charts: TEST_CHARTS
            }
        });

        const pieCharts = wrapper.findAllComponents(CalculatorPieChart);
        expect(pieCharts.length).toBe(TEST_CHARTS.length);

        for (const [_index, _pieChart] of pieCharts.entries()) {
            const chart = TEST_CHARTS[_index]!;
            expect(_pieChart.props()).toEqual({
                title: chart.title,
                items: chart.props.items
            });
        }
    });
});
