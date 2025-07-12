import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import { testAttrPassingToRoot } from "@root/__test__/utils.js";
import Alert from "@/components/common/alert.vue";
import AffordabilityAlert from "@/components/affordability-alert.vue";

const MOCK_MINIMUM_WAGE_GROSS_MONTHLY = 1_000;

describe("components/affordability-alert.vue", () => {
    const createWrapper = (props: any) => mount(AffordabilityAlert, {
        props,
        global: {
            provide: {
                MINIMUM_WAGE_GROSS_MONTHLY: MOCK_MINIMUM_WAGE_GROSS_MONTHLY
            }
        }
    });

    testAttrPassingToRoot(AffordabilityAlert, { props: { price: 0 } });

    it("renders an `<alert />` with correct color", () => {
        const wrapper = createWrapper({ price: 0 });

        const alert = wrapper.findComponent(Alert);
        expect(alert.exists()).toBeTruthy();
        expect(alert.props("color")).toBe("info");
    });

    it("shows yearly duration for yearly minimum wage", () => {
        const wrapper = createWrapper({
            price: MOCK_MINIMUM_WAGE_GROSS_MONTHLY * 12
        });
        expect(wrapper.vm.wageDurationSummary).toContain("1 yıllık");
    });

    it("shows monthly duration for monthly minimum wage", () => {
        const wrapper = createWrapper({
            price: MOCK_MINIMUM_WAGE_GROSS_MONTHLY
        });
        expect(wrapper.vm.wageDurationSummary).toContain("1 aylık");
    });

    it("shows daily duration for daily minimum wage", () => {
        const wrapper = createWrapper({
            price: MOCK_MINIMUM_WAGE_GROSS_MONTHLY / 30
        });
        expect(wrapper.vm.wageDurationSummary).toContain("1 günlük");
    });

    it("rounds down duration to nearest whole number", () => {
        const wrapper = createWrapper({
            price: MOCK_MINIMUM_WAGE_GROSS_MONTHLY * 1.9
        });
        expect(wrapper.vm.wageDurationSummary).toContain("1 aylık");
    });
});
