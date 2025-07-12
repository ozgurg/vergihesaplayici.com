import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { testAttrPassingToRoot, testRootClass } from "@root/__test__/utils.js";
import Spinner from "@/components/common/spinner.vue";

describe("components/common/spinner.vue", () => {
    testAttrPassingToRoot(Spinner);
    testRootClass(Spinner, "spinner");

    it("has correct `role`, `aria-valuemax`, and `aria-valuemin` attrs", () => {
        const wrapper = mount(Spinner);
        expect(wrapper.attributes("role")).toBe("progressbar");
        expect(wrapper.attributes("aria-valuemax")).toBe("100");
        expect(wrapper.attributes("aria-valuemin")).toBe("0");
    });
});
