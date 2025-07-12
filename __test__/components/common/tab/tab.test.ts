import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { testAttrPassingToRoot, testDefaultSlot, testRootClass } from "@root/__test__/utils.js";
import Tabs from "@/components/common/tab/tabs.vue";
import TabList from "@/components/common/tab/tab-list.vue";
import Tab from "@/components/common/tab/tab.vue";

const DEFAULT_OPTIONS = {
    global: {
        provide: {
            "tabs.modelValue": { value: "tab-1" },
            "tabs.id": "test-tabs"
        }
    }
};

describe("components/common/tab/tab.vue", () => {
    const createWrapper = (props = {}) => mount(Tab, {
        props: {
            value: "tab-1",
            ...props
        },
        ...DEFAULT_OPTIONS
    });

    const createTabsWrapper = (initialValue: string) => {
        const wrapper = mount({
            //language=Vue
            template: `
                <tabs v-model="value">
                    <tab-list>
                        <tab value="tab-1">Tab 1</tab>
                        <tab value="tab-2">Tab 2</tab>
                        <tab value="tab-3">Tab 3</tab>
                    </tab-list>
                </tabs>
            `,
            data: () => ({
                value: initialValue
            }),
            components: {
                Tabs,
                TabList,
                Tab
            }
        });
        const tabs = wrapper.findAllComponents(Tab);
        const tab1 = tabs[0]!;
        const tab2 = tabs[1]!;
        const tab3 = tabs[2]!;
        return {
            wrapper,
            tab1, tab2, tab3
        };
    };

    testDefaultSlot(Tab, {
        props: { value: "tab-1" },
        ...DEFAULT_OPTIONS
    });

    testAttrPassingToRoot(Tab, {
        props: { value: "tab-1" },
        ...DEFAULT_OPTIONS
    });

    testRootClass(Tab, "tab", {
        props: { value: "tab-1" },
        ...DEFAULT_OPTIONS
    });

    it("generates correct `id` and `aria-controls` attrs", () => {
        const wrapper = createWrapper();
        expect(wrapper.attributes("id")).toBe("test-tabs-tab-tab-1");
        expect(wrapper.attributes("aria-controls")).toBe("test-tabs-tab-panel-tab-1");
    });

    it("sets `aria-selected` based on `modelValue`", () => {
        const wrapper1 = createWrapper();
        expect(wrapper1.attributes("aria-selected")).toBe("true");

        const wrapper2 = mount(Tab, {
            props: { value: "tab-2" },
            global: {
                provide: {
                    "tabs.modelValue": { value: "tab-1" },
                    "tabs.id": "test-tabs"
                }
            }
        });
        expect(wrapper2.attributes("aria-selected")).toBe("false");
    });

    it("sets `tabindex` based on selection state", () => {
        const wrapper = createWrapper();
        expect(wrapper.attributes("tabindex")).toBeUndefined();

        const wrapper2 = mount(Tab, {
            props: { value: "tab-2" },
            global: {
                provide: {
                    "tabs.modelValue": { value: "tab-1" },
                    "tabs.id": "test-tabs"
                }
            }
        });
        expect(wrapper2.attributes("tabindex")).toBe("-1");
    });

    it("updates `modelValue` when clicked", async () => {
        const modelValue = { value: "tab-1" };
        const wrapper = mount(Tab, {
            props: { value: "tab-2" },
            global: {
                provide: {
                    "tabs.modelValue": modelValue,
                    "tabs.id": "test-tabs"
                }
            }
        });

        await wrapper.trigger("click");
        expect(modelValue.value).toBe("tab-2");
    });

    it("navigates first tab on `Home` key press", async () => {
        const {
            wrapper,
            tab1,
            tab2,
            tab3
        } = createTabsWrapper("tab-3");

        expect(tab3.attributes("aria-selected")).toBe("true");

        // tab-3 > tab-1
        await tab3.trigger("keydown", { key: "Home" });
        expect(wrapper.vm.value).toBe("tab-1");
        expect(tab1.attributes("aria-selected")).toBe("true");
        expect(tab2.attributes("aria-selected")).toBe("false");
        expect(tab3.attributes("aria-selected")).toBe("false");

        // tab-1 > tab-1 (ignores repeated selection of active tab)
        await tab1.trigger("keydown", { key: "Home" });
        expect(wrapper.vm.value).toBe("tab-1");
        expect(tab1.attributes("aria-selected")).toBe("true");
        expect(tab2.attributes("aria-selected")).toBe("false");
        expect(tab3.attributes("aria-selected")).toBe("false");
    });

    it("navigates last tab on `End` key press", async () => {
        const {
            wrapper,
            tab1,
            tab2,
            tab3
        } = createTabsWrapper("tab-1");

        expect(tab1.attributes("aria-selected")).toBe("true");

        // tab-1 > tab-3
        await tab1.trigger("keydown", { key: "End" });
        expect(wrapper.vm.value).toBe("tab-3");
        expect(tab1.attributes("aria-selected")).toBe("false");
        expect(tab2.attributes("aria-selected")).toBe("false");
        expect(tab3.attributes("aria-selected")).toBe("true");

        // tab-3 > tab-3 (ignores repeated selection of active tab)
        await tab3.trigger("keydown", { key: "End" });
        expect(wrapper.vm.value).toBe("tab-3");
        expect(tab1.attributes("aria-selected")).toBe("false");
        expect(tab2.attributes("aria-selected")).toBe("false");
        expect(tab3.attributes("aria-selected")).toBe("true");
    });

    it("navigates backward on each `ArrowLeft` key press", async () => {
        const {
            wrapper,
            tab1,
            tab2,
            tab3
        } = createTabsWrapper("tab-3");

        expect(tab3.attributes("aria-selected")).toBe("true");

        // tab-3 > tab-2
        await tab3.trigger("keydown", { key: "ArrowLeft" });
        expect(wrapper.vm.value).toBe("tab-2");
        expect(tab1.attributes("aria-selected")).toBe("false");
        expect(tab2.attributes("aria-selected")).toBe("true");
        expect(tab3.attributes("aria-selected")).toBe("false");

        // tab-2 > tab-1
        await tab2.trigger("keydown", { key: "ArrowLeft" });
        expect(wrapper.vm.value).toBe("tab-1");
        expect(tab1.attributes("aria-selected")).toBe("true");
        expect(tab2.attributes("aria-selected")).toBe("false");
        expect(tab3.attributes("aria-selected")).toBe("false");

        // tab-1 > tab-3
        await tab1.trigger("keydown", { key: "ArrowLeft" });
        expect(wrapper.vm.value).toBe("tab-3");
        expect(tab1.attributes("aria-selected")).toBe("false");
        expect(tab2.attributes("aria-selected")).toBe("false");
        expect(tab3.attributes("aria-selected")).toBe("true");
    });

    it("navigates forward on each `ArrowLeft` key press", async () => {
        const {
            wrapper,
            tab1,
            tab2,
            tab3
        } = createTabsWrapper("tab-1");

        expect(tab1.attributes("aria-selected")).toBe("true");

        // tab-1 > tab-2
        await tab1.trigger("keydown", { key: "ArrowRight" });
        expect(wrapper.vm.value).toBe("tab-2");
        expect(tab1.attributes("aria-selected")).toBe("false");
        expect(tab2.attributes("aria-selected")).toBe("true");
        expect(tab3.attributes("aria-selected")).toBe("false");

        // tab-2 > tab-3
        await tab2.trigger("keydown", { key: "ArrowRight" });
        expect(wrapper.vm.value).toBe("tab-3");
        expect(tab1.attributes("aria-selected")).toBe("false");
        expect(tab2.attributes("aria-selected")).toBe("false");
        expect(tab3.attributes("aria-selected")).toBe("true");

        // tab-3 > tab-1
        await tab3.trigger("keydown", { key: "ArrowRight" });
        expect(wrapper.vm.value).toBe("tab-1");
        expect(tab1.attributes("aria-selected")).toBe("true");
        expect(tab2.attributes("aria-selected")).toBe("false");
        expect(tab3.attributes("aria-selected")).toBe("false");
    });

    it("throws error when not used within `<tab-list />`", () => {
        expect(() => mount(Tab, {
            props: { value: "tab-1" }
            // Do not provide the required `tabs.id` to trigger the error for testing
        })).toThrow("`<tab />` components must be placed within a `<tab-list />`, and `<tab-list /> component must be nested within a `<tabs />`.");
    });
});
