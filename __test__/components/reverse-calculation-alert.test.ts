import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { testAttrPassingToRoot } from "@root/__test__/utils.js";
import Alert from "@/components/common/alert.vue";
import ReverseCalculationAlert from "@/components/reverse-calculation-alert.vue";

describe("components/reverse-calculation-alert.vue", () => {
    testAttrPassingToRoot(ReverseCalculationAlert);

    it("renders an `<alert />` with correct color", () => {
        const wrapper = mount(ReverseCalculationAlert);

        const alert = wrapper.findComponent(Alert);
        expect(alert.exists()).toBeTruthy();
        expect(alert.props("color")).toBe("warning");
    });
});
