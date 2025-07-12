import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { testAttrPassingToRoot } from "@root/__test__/utils.js";
import Alert from "@/components/common/alert.vue";
import EstimatedCalculationAlert from "@/components/estimated-calculation-alert.vue";

describe("components/estimated-calculation-alert.vue", () => {
    testAttrPassingToRoot(EstimatedCalculationAlert);

    it("renders an `<alert />` with correct color", () => {
        const wrapper = mount(EstimatedCalculationAlert);

        const alert = wrapper.findComponent(Alert);
        expect(alert.exists()).toBeTruthy();
        expect(alert.props("color")).toBe("warning");
    });
});
