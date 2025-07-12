import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { testAttrPassingToRoot } from "@root/__test__/utils.js";
import Alert from "@/components/common/alert.vue";
import ArticleLegalDisclaimerAlert from "@/components/article-legal-disclaimer-alert.vue";

describe("components/article-legal-disclaimer-alert.vue", () => {
    testAttrPassingToRoot(ArticleLegalDisclaimerAlert);

    it("renders an `<alert />` with correct color", () => {
        const wrapper = mount(ArticleLegalDisclaimerAlert);

        const alert = wrapper.findComponent(Alert);
        expect(alert.exists()).toBeTruthy();
        expect(alert.props("color")).toBe("warning");
    });
});
