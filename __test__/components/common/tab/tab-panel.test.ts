import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { testAttrPassingToRoot, testDefaultSlot } from "@root/__test__/utils.js";
import TabPanel from "@/components/common/tab/tab-panel.vue";

const PROVIDE_MODEL_VALUE = "test-tabs-modelValue";
const PROVIDE_ID = "test-tabs-id";

describe("components/common/tab/tab-panel.vue", () => {
    const createWrapper = (props = {}) => mount(TabPanel, {
        props: {
            value: PROVIDE_MODEL_VALUE,
            ...props
        },
        global: {
            provide: {
                "tabs.modelValue": { value: PROVIDE_MODEL_VALUE },
                "tabs.id": PROVIDE_ID
            }
        }
    });

    testDefaultSlot(TabPanel, {
        props: { value: "PLACEHOLDER" },
        global: {
            provide: {
                "tabs.modelValue": { value: "PLACEHOLDER" },
                "tabs.id": "PLACEHOLDER"
            }
        }
    });

    testAttrPassingToRoot(TabPanel, {
        props: { value: "PLACEHOLDER" },
        global: {
            provide: {
                "tabs.modelValue": { value: "PLACEHOLDER" },
                "tabs.id": "PLACEHOLDER"
            }
        }
    });

    it("uses passed `id` and `aria-labelledby` instead of generating a random one", () => {
        const id = "test-id";
        const ariaLabelledby = "test-aria-labelledby";
        const wrapper = createWrapper({
            id,
            "aria-labelledby": ariaLabelledby
        });

        expect(wrapper.attributes("id")).toBe(id);
        expect(wrapper.attributes("aria-labelledby")).toBe(ariaLabelledby);
    });

    it("generates random `id` and `aria-labelledby` attrs if none are passed", () => {
        const wrapper = createWrapper();
        expect(wrapper.attributes("id")).toBe(`${PROVIDE_ID}-tab-panel-${PROVIDE_MODEL_VALUE}`);
        expect(wrapper.attributes("aria-labelledby")).toBe(`${PROVIDE_ID}-tab-${PROVIDE_MODEL_VALUE}`);
    });

    it("has correct `id`, `aria-labelledby`, `role` and `tabindex` attrs", () => {
        const wrapper = createWrapper();

        // We already tested their values in previous tests
        expect(wrapper.attributes("id")).toBeDefined();
        expect(wrapper.attributes("aria-labelledby")).toBeDefined();

        expect(wrapper.attributes("role")).toBe("tabpanel");
        expect(wrapper.attributes("tabindex")).toBe("0");
    });

    it("sets `hidden` based on selection state", () => {
        const wrapper1 = mount(TabPanel, {
            props: { value: "tab-panel-1" },
            global: {
                provide: {
                    "tabs.modelValue": { value: "tab-panel-1" },
                    "tabs.id": "PLACEHOLDER"
                }
            }
        });
        expect(wrapper1.attributes("hidden")).toBeUndefined();

        const wrapper2 = mount(TabPanel, {
            props: { value: "tab-panel-2" },
            global: {
                provide: {
                    "tabs.modelValue": { value: "tab-panel-1" },
                    "tabs.id": "PLACEHOLDER"
                }
            }
        });
        expect(wrapper2.attributes("hidden")).toBe("");
    });

    it("throws error when not used within `<tabs />`", () => {
        expect(() => mount(TabPanel, {
            props: { value: "tab-panel-1" }
            // Do not provide the required `tabs.id` to trigger the error for testing
        })).toThrow("`<tab-panel />` components must be nested within a `<tabs />`.");
    });
});
