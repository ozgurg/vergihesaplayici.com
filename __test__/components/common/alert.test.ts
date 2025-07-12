import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { testAttrPassingToRoot, testDefaultSlot, testRootClass } from "@root/__test__/utils.js";
import Alert from "@/components/common/alert.vue";

describe("components/common/alert.vue", () => {
    testDefaultSlot(Alert);
    testAttrPassingToRoot(Alert);
    testRootClass(Alert, "alert");

    it("applies correct `warning` color class", () => {
        const wrapper = mount(Alert, {
            props: { color: "warning" }
        });
        expect(wrapper.classes()).toContain("alert-color-warning");
    });

    it("applies correct `info` color class", () => {
        const wrapper = mount(Alert, {
            props: { color: "info" }
        });
        expect(wrapper.classes()).toContain("alert-color-info");
    });
});
