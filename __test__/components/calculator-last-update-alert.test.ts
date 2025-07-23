import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { testAttrPassingToRoot } from "@root/__test__/utils.js";
import Alert from "@/components/common/alert.vue";
import CalculatorLastUpdateAlert from "@/components/calculator-last-update-alert.vue";

describe("components/calculator-last-update-alert.vue", () => {
    testAttrPassingToRoot(CalculatorLastUpdateAlert, { props: { date: new Date() } });

    it("renders an `<alert />` with correct color", () => {
        const wrapper = mount(CalculatorLastUpdateAlert, { props: { date: new Date() } });

        const alert = wrapper.findComponent(Alert);
        expect(alert.exists()).toBeTruthy();
        expect(alert.props("color")).toBe("warning");
    });
});
