import type { DOMWrapper } from "@vue/test-utils";
import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { testAttrPassingToRoot, testRootClass } from "@root/__test__/utils.js";
import FormRadioGroupItem from "@/components/common/form/form-radio-group-item.vue";
import FormRadioGroup from "@/components/common/form/form-radio-group.vue";

describe("components/common/form/form-radio-group.vue", () => {
    testAttrPassingToRoot(FormRadioGroup, { props: { items: [] } });
    testRootClass(FormRadioGroup, "form-radio-group", { props: { items: [] } });

    it("has the correct `role` attr", () => {
        const wrapper = mount(FormRadioGroup, { props: { items: [] } });
        expect(wrapper.attributes("role")).toBe("radiogroup");
    });

    it("applies `aria-labelledby` if provided", () => {
        const testAriaLabelledby = "test-aria-labelledby";
        const wrapper = mount(FormRadioGroup, {
            props: { items: [] },
            attrs: {
                "aria-labelledby": testAriaLabelledby
            }
        });
        expect(wrapper.attributes("aria-labelledby")).toBe(testAriaLabelledby);
    });

    it("applies the injected `form-group.id` as `aria-labelledby` if `aria-labelledby` is not provided", () => {
        const testFormGroupId = "test-form-group";
        const wrapper = mount(FormRadioGroup, {
            props: { items: [] },
            global: {
                provide: {
                    "form-group.id": testFormGroupId
                }
            }
        });
        expect(wrapper.attributes("aria-labelledby")).toBe(testFormGroupId);
    });

    it("generates a unique `name` value for each instance if `name` is not provided", () => {
        const wrapper = mount({
            //language=Vue
            template: `
                <form-radio-group :items="[]" />
                <form-radio-group :items="[]" />
            `,
            components: {
                FormRadioGroup
            }
        });
        const formRadioGroups = wrapper.findAllComponents(FormRadioGroup);
        // @ts-expect-error: FIXME
        expect(formRadioGroups[0]!.vm.NAME).not.toBe(formRadioGroups[1]!.vm.NAME);
    });

    it("sets a unique `--anchor-name` CSS variable", () => {
        const wrapper = mount(FormRadioGroup, { props: { items: [] } });
        const style = getComputedStyle(wrapper.element).getPropertyValue("--anchor-name");
        expect(style).toMatch(/^--form-radio-group-checked-indicator-[\w-]+$/);
    });

    it("applies the `scale` class", () => {
        const wrapper = mount(FormRadioGroup, {
            props: { items: [], scale: "small" }
        });
        expect(wrapper.classes()).toContain("form-radio-group-scale-small");
    });

    it("renders the given items as `<form-radio-group-item />` components", () => {
        const testItem = [
            {
                title: "Item 1",
                description: "Description 1",
                input: {
                    value: "item-1"
                }
            },
            {
                title: "Item 2",
                input: {
                    value: "item-2"
                }
            }
        ];
        const wrapper = mount(FormRadioGroup, {
            props: {
                items: testItem
            }
        });

        const formRadipGroupItems = wrapper.findAllComponents(FormRadioGroupItem);

        expect(formRadipGroupItems).toHaveLength(testItem.length);

        for (const [_index, _formRadipGroupItem] of formRadipGroupItems.entries()) {
            const item = testItem[_index]!;

            expect(_formRadipGroupItem.find("b").exists()).toBeTruthy();
            expect(_formRadipGroupItem.find("b").text()).toBe(item.title);

            if (item.description) {
                expect(_formRadipGroupItem.find("small").exists()).toBeTruthy();
                expect(_formRadipGroupItem.find("small").text()).toBe(item.description);
            } else {
                expect(_formRadipGroupItem.find("small").exists()).toBeFalsy();
            }
        }
    });

    it("passes down `name`, `required`, `scale`, and any other input attrs to all `<form-radio-group-item />`s", () => {
        const testName = "test-form-radio-group";
        const testRequired = true;
        const testScale = "large";
        const testItem = [
            {
                title: "Item 1",
                description: "Description 1",
                input: {
                    "data-custom-attr": "i-am-custom",
                    value: "item-1"
                }
            },
            {
                title: "Item 2",
                description: "Description 2",
                input: {
                    "data-custom-attr": "i-am-custom-too",
                    value: "item-2"
                }
            }
        ];
        const wrapper = mount(FormRadioGroup, {
            props: {
                name: testName,
                required: testRequired,
                scale: testScale,
                items: testItem
            }
        });

        const formRadipGroupItems = wrapper.findAllComponents(FormRadioGroupItem);

        for (const [_index, _formRadipGroupItem] of formRadipGroupItems.entries()) {
            const item = testItem[_index]!;
            const input = _formRadipGroupItem.find("input") as DOMWrapper<HTMLInputElement>;

            expect(input.attributes("name")).toBe(testName);
            expect(input.attributes("data-custom-attr")).toBe(item.input["data-custom-attr"]);
            expect(input.element.required).toBe(testRequired);
            expect(_formRadipGroupItem.props("scale")).toBe(testScale);
        }
    });
});
