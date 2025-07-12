import type { DOMWrapper } from "@vue/test-utils";
import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { testDefaultSlot, testRootClass } from "@root/__test__/utils.js";
import FormRadioGroupItem from "@/components/common/form/form-radio-group-item.vue";

describe("components/common/form/form-radio-group-item.vue", () => {
    testDefaultSlot(FormRadioGroupItem);
    testRootClass(FormRadioGroupItem, "form-radio-group-item");

    it("applies the `scale` class", () => {
        const wrapper = mount(FormRadioGroupItem, {
            props: { scale: "small" }
        });
        expect(wrapper.classes()).toContain("form-radio-group-item-scale-small");
    });

    it("uses the generated ID for both the `for` attr and the `<input />`'s `id` attr", () => {
        const wrapper = mount(FormRadioGroupItem);
        expect(wrapper.attributes("for")).toBe(wrapper.find("input").attributes("id"));
    });

    it("generates a unique `for` value for each instance", () => {
        const wrapper = mount({
            //language=Vue
            template: `
                <form-radio-group-item />
                <form-radio-group-item />
            `,
            components: {
                FormRadioGroupItem
            }
        });
        const formRadioGroupItems = wrapper.findAllComponents(FormRadioGroupItem);
        expect(formRadioGroupItems[0]!.attributes("for")).not.toBe(formRadioGroupItems[1]!.attributes("for"));
    });

    it("passes all attrs to `<input />`", () => {
        const testAttrs = {
            required: "",
            "hey-im-an-attr": "yes-iam",
            value: "im-am-valuable"
        };
        const wrapper = mount(FormRadioGroupItem, {
            attrs: testAttrs
        });

        const input = wrapper.find("input") as DOMWrapper<HTMLInputElement>;

        expect(input.exists()).toBeTruthy();
        for (const [attr, value] of Object.entries(testAttrs)) {
            expect(input.attributes(attr)).toEqual(value);
        }
    });

    it("uses the injected `form-radio-group.modelValue`", () => {
        const testTabsModelValue = "test-form-radio-group-model-value";
        const wrapper = mount(FormRadioGroupItem, {
            global: {
                provide: {
                    "form-radio-group.modelValue": testTabsModelValue
                }
            }
        });
        // @ts-expect-error: FIXME
        expect(wrapper.vm.formRadioGroupModelValue).toBe(testTabsModelValue);
    });

    it("uses the default `form-radio-group.modelValue` if not injected", () => {
        const wrapper = mount(FormRadioGroupItem);
        // @ts-expect-error: FIXME
        expect(wrapper.vm.formRadioGroupModelValue).toBeUndefined();
    });

    it("binds `v-model` correctly", async () => {
        const injectedModel = ref("item-1");

        const wrapper = mount({
            //language=Vue
            template: `
                <form-radio-group-item value="item-1" />
                <form-radio-group-item value="item-2" />
            `,
            components: {
                FormRadioGroupItem
            }
        }, {
            global: {
                provide: {
                    "form-radio-group.modelValue": injectedModel
                }
            }
        });

        const radios = wrapper.findAll("input") as DOMWrapper<HTMLInputElement>[];

        expect(radios[0]!.element.checked).toBeTruthy();
        expect(radios[1]!.element.checked).toBeFalsy();

        await radios[1]!.setValue(true);

        expect(injectedModel.value).toBe("item-2");
        expect(radios[1]!.element.checked).toBeTruthy();
        expect(radios[0]!.element.checked).toBeFalsy();
    });
});
