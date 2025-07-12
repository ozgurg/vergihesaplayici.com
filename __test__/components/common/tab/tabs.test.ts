import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import { inject } from "vue";
import { testDefaultSlot } from "@root/__test__/utils.js";
import Tabs from "@/components/common/tab/tabs.vue";

describe("components/common/tab/tabs.vue", () => {
    testDefaultSlot(Tabs);

    it("provides `tabs.modelValue`", () => {
        let injectedModelValue: any;
        const TestChild = {
            template: "<div></div>",
            setup() {
                injectedModelValue = inject("tabs.modelValue");
            }
        };

        const wrapper = mount(Tabs, {
            props: {
                modelValue: "test-modelValue"
            },
            slots: {
                default: TestChild
            }
        });
        expect(wrapper.vm.modelValue).toBe(injectedModelValue.value);
    });

    it("provides unique `tabs.id`s for each instance", () => {
        let injectedId1: any;
        const TestChild1 = {
            template: "<div></div>",
            setup() {
                injectedId1 = inject("tabs.id");
            }
        };

        let injectedId2: any;
        const TestChild2 = {
            template: "<div></div>",
            setup() {
                injectedId2 = inject("tabs.id");
            }
        };

        mount({
            //language=Vue
            template: `
                <tabs>
                    <test-child-1 />
                </tabs>
                <tabs>
                    <test-child-2 />
                </tabs>
            `,
            components: {
                Tabs,
                TestChild1,
                TestChild2
            }
        });
        expect(injectedId1).not.toBe(injectedId2);
    });
});
