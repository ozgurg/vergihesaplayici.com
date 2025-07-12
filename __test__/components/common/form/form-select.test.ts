import type { DOMWrapper } from "@vue/test-utils";
import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { testRootClass } from "@root/__test__/utils.js";
import FormSelect from "@/components/common/form/form-select.vue";

describe("components/common/form/form-select.vue", () => {
    testRootClass(FormSelect, "form-select", { props: { items: [] } });

    it("applies passed attrs to `<select />`", () => {
        const testAttrs = {
            id: "passed-id",
            title: "Passed Title"
        };
        const wrapper = mount(FormSelect, {
            props: { items: [] },
            attrs: testAttrs
        });

        const select = wrapper.find("select");
        expect(select.attributes("id")).toBe(testAttrs.id);
        expect(select.attributes("title")).toBe(testAttrs.title);
    });

    it("renders options from `items`", () => {
        const testItems = [
            { title: "Option 1", value: "1" },
            { title: "Option 2", value: "2", disabled: true },
            { title: "Option 3", value: "3", selected: true }
        ];
        const wrapper = mount(FormSelect, {
            props: {
                modelValue: "3",
                items: testItems
            }
        });

        const options = wrapper.findAll("option[value]") as DOMWrapper<HTMLOptionElement>[];

        for (const [_index, _option] of options.entries()) {
            const testItem = testItems[_index]!;
            expect(_option.element.value).toBe(testItem.value);
            expect(_option.element.disabled).toBe(testItem.disabled ?? false);
            expect(_option.element.selected).toBe(wrapper.vm.modelValue === testItem.value);
        }
    });

    it("renders placeholder `<option />` correctly", () => {
        const wrapper = mount(FormSelect, { props: { items: [] } });

        const placeholderOption = wrapper.find("option:first-child") as DOMWrapper<HTMLOptionElement>;
        expect(placeholderOption.exists()).toBeTruthy();
        expect(placeholderOption.attributes("disabled")).toBeDefined();
        expect(placeholderOption.attributes("selected")).toBeDefined();
        expect(placeholderOption.attributes("value")).toBeUndefined();
        expect(placeholderOption.element.parentElement?.tagName).toBe("SELECT"); // To ensure that the `<option />` is the first child of the `<select />`
    });

    it("applies `scale` class", () => {
        const wrapper = mount(FormSelect, {
            props: {
                items: [],
                scale: "small"
            }
        });
        expect(wrapper.classes()).toContain("form-select-scale-small");
    });

    it("binds `v-model` correctly", async () => {
        let testModelValue: any = "1";
        const wrapper = mount(FormSelect, {
            props: {
                modelValue: testModelValue,
                items: [
                    { title: "Option 1", value: "1" },
                    { title: "Option 2", value: "2" }
                ],
                "onUpdate:modelValue": (value: any) => {
                    testModelValue = value;
                }
            }
        });

        const select = wrapper.find("select");
        await select.setValue("2");
        expect(testModelValue).toBe("2");
        expect(wrapper.emitted("update:modelValue")?.[0]).toEqual([testModelValue]);
    });
});
