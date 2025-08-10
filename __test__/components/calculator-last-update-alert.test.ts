import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { testAttrPassingToRoot, testRootClass } from "@root/__test__/utils.js";
import Alert from "@/components/common/alert.vue";
import CalculatorLastUpdateAlert from "@/components/calculator-last-update-alert.vue";

describe("components/calculator-last-update-alert.vue", () => {
    testRootClass(CalculatorLastUpdateAlert, "calculator-last-update-alert", { props: { date: new Date() } });
    testAttrPassingToRoot(CalculatorLastUpdateAlert, { props: { date: new Date() } });

    it("renders an `<alert />` with correct color", () => {
        const wrapper = mount(CalculatorLastUpdateAlert, { props: { date: new Date() } });

        const alert = wrapper.findComponent(Alert);
        expect(alert.exists()).toBeTruthy();
        expect(alert.props("color")).toBe("warning");
    });

    it("applies or not applies `alignToLabel` class", () => {
        const wrapper1 = mount(CalculatorLastUpdateAlert, {
            props: { date: new Date(), alignToLabel: true }
        });
        expect(wrapper1.classes()).toContain("calculator-last-update-alert-label-aligned");

        const wrapper2 = mount(CalculatorLastUpdateAlert, {
            props: { date: new Date(), alignToLabel: false }
        });
        expect(wrapper2.classes()).not.toContain("calculator-last-update-alert-label-aligned");
    });
});
