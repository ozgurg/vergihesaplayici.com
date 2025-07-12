import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { testAttrPassingToRoot, testDefaultSlot, testRootClass } from "@root/__test__/utils.js";
import TabList from "@/components/common/tab/tab-list.vue";

const WRAPPER_OPTIONS = {
    global: {
        provide: {
            "tabs.id": "test-tabs-id"
        }
    }
};

describe("components/common/tab/tab-list.vue", () => {
    const createWrapper = (props = {}) => mount(TabList, {
        props,
        ...WRAPPER_OPTIONS
    });

    testDefaultSlot(TabList, WRAPPER_OPTIONS);
    testAttrPassingToRoot(TabList, WRAPPER_OPTIONS);
    testRootClass(TabList, "tab-list", WRAPPER_OPTIONS);

    it("has the correct `role` attr", () => {
        const wrapper = createWrapper();
        expect(wrapper.attributes("role")).toBe("tablist");
    });

    it("sets a unique `--anchor-name` CSS variable", () => {
        const wrapper = createWrapper();
        const style = getComputedStyle(wrapper.element).getPropertyValue("--anchor-name");
        expect(style).toMatch(/^--tab-active-item-indicator-[\w-]+$/);
    });
});
