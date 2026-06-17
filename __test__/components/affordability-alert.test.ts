import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import { testAttrPassingToRoot } from "@root/__test__/utils.js";
import Alert from "@/components/common/alert.vue";
import AffordabilityAlert, { MINIMUM_WAGE_GROSS_MONTHLY } from "@/components/affordability-alert.vue";

describe("components/affordability-alert.vue", () => {
    testAttrPassingToRoot(AffordabilityAlert, { props: { price: 0 } });

    it("renders an `<alert />` with correct color", () => {
        const wrapper = mount(AffordabilityAlert, {
            props: { price: 0 }
        });

        const alert = wrapper.findComponent(Alert as any);
        expect(alert.exists()).toBeTruthy();
        expect((alert as any).props("color")).toBe("info");
    });

    it("shows yearly duration for yearly minimum wage", () => {
        const wrapper = mount(AffordabilityAlert, {
            props: { price: MINIMUM_WAGE_GROSS_MONTHLY * 12 }
        });
        expect(wrapper.text()).toContain("1 yıllık");
    });

    it("shows monthly duration for monthly minimum wage", () => {
        const wrapper = mount(AffordabilityAlert, {
            props: { price: MINIMUM_WAGE_GROSS_MONTHLY }
        });
        expect(wrapper.text()).toContain("1 aylık");
    });

    it("shows daily duration for daily minimum wage", () => {
        const wrapper = mount(AffordabilityAlert, {
            props: { price: MINIMUM_WAGE_GROSS_MONTHLY / 30 }
        });
        expect(wrapper.text()).toContain("1 günlük");
    });

    it("shows decimal places", () => {
        const wrapper = mount(AffordabilityAlert, {
            props: { price: MINIMUM_WAGE_GROSS_MONTHLY * 1.9 }
        });
        expect(wrapper.text()).toContain("1.9 aylık");
    });
});
