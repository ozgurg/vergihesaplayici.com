import type { DOMWrapper } from "@vue/test-utils";
import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { testAttrPassingToRoot, testRootClass } from "@root/__test__/utils.js";
import SvgIcon from "@/components/common/svg-icon.vue";
import FormCheck from "@/components/common/form/form-check.vue";
import FormCheckGroup from "@/components/common/form/form-check-group.vue";

describe("components/common/form/form-check-group.vue", () => {
    testAttrPassingToRoot(FormCheckGroup);
    testRootClass(FormCheckGroup, "form-check-group");

    it("has the correct `role` attr", () => {
        const wrapper = mount(FormCheckGroup);
        expect(wrapper.attributes("role")).toBe("radiogroup");
    });

    it("applies `aria-labelledby` if provided", () => {
        const testAriaLabelledby = "test-aria-labelledby";
        const wrapper = mount(FormCheckGroup, {
            attrs: {
                "aria-labelledby": testAriaLabelledby
            }
        });
        expect(wrapper.attributes("aria-labelledby")).toBe(testAriaLabelledby);
    });

    it("applies the injected `form-group.id` as `aria-labelledby` if `aria-labelledby` is not provided", () => {
        const testFormGroupId = "test-form-group";
        const wrapper = mount(FormCheckGroup, {
            global: {
                provide: {
                    "form-group.id": testFormGroupId
                }
            }
        });
        expect(wrapper.attributes("aria-labelledby")).toBe(testFormGroupId);
    });

    it("does not set `aria-labelledby` when neither `aria-labelledby` nor `form-group.id` is provided", () => {
        const wrapper = mount(FormCheckGroup);
        expect(wrapper.attributes("aria-labelledby")).toBeUndefined();
    });

    it("uses provided `name` when available", () => {
        const testName = "test-name";
        const wrapper = mount(FormCheckGroup, {
            props: { name: testName }
        });
        // @ts-expect-error: FIXME
        expect(wrapper.vm.NAME).toBe(testName);
    });

    it("generates a unique `name` value for each instance if `name` is not provided", () => {
        const wrapper = mount({
            //language=Vue
            template: `
                <form-check-group :items="[]" type="radio" />
                <form-check-group :items="[]" type="radio" />
            `,
            components: {
                FormCheckGroup
            }
        });
        const FormCheckGroups = wrapper.findAllComponents(FormCheckGroup);
        // @ts-expect-error: FIXME
        expect(FormCheckGroups[0]!.vm.NAME).not.toBe(FormCheckGroups[1]!.vm.NAME);
    });

    it("sets a unique `--anchor-name` CSS variable", () => {
        const wrapper = mount(FormCheckGroup);
        const style = getComputedStyle(wrapper.element).getPropertyValue("--anchor-name");
        expect(style).toMatch(/^--form-check-group-checked-indicator-[\w-]+$/);
    });

    it("applies the `scale` class", () => {
        const wrapper = mount(FormCheckGroup, {
            props: { scale: "small" }
        });
        expect(wrapper.classes()).toContain("form-check-group-scale-small");
    });

    it("renders the given items as `<form-check />` components", () => {
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
        const wrapper = mount(FormCheckGroup, {
            props: {
                items: testItem,
                type: "radio"
            }
        });

        const formChecks = wrapper.findAllComponents(FormCheck);

        expect(formChecks).toHaveLength(testItem.length);

        for (const [_index, _formCheck] of formChecks.entries()) {
            const item = testItem[_index]!;

            expect(_formCheck.find("b").exists()).toBeTruthy();
            expect(_formCheck.find("b").text()).toBe(item.title);

            if (item.description) {
                expect(_formCheck.find("small").exists()).toBeTruthy();
                expect(_formCheck.find("small").text()).toBe(item.description);
            } else {
                expect(_formCheck.find("small").exists()).toBeFalsy();
            }
        }
    });

    it("renders items without descriptions correctly", () => {
        const testItem = [
            {
                title: "Item 1",
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
        const wrapper = mount(FormCheckGroup, {
            props: {
                items: testItem,
                type: "radio"
            }
        });

        const formChecks = wrapper.findAllComponents(FormCheck);

        for (const _formCheck of formChecks) {
            expect(_formCheck.find("small").exists()).toBeFalsy();
        }
    });

    it("renders items with icons correctly", () => {
        const testItem = [
            {
                title: "Item 1",
                icon: "test-icon-1",
                input: {
                    value: "item-1"
                }
            },
            {
                title: "Item 2",
                icon: "test-icon-2",
                input: {
                    value: "item-2"
                }
            }
        ];
        const wrapper = mount(FormCheckGroup, {
            props: {
                items: testItem,
                type: "radio"
            }
        });

        const formChecks = wrapper.findAllComponents(FormCheck);

        for (const [_index, _formCheck] of formChecks.entries()) {
            const item = testItem[_index]!;
            const svgIcons = _formCheck.findAllComponents(SvgIcon);
            const customIcon = svgIcons.find(icon =>
                !icon.classes().includes("checked-icon") &&
                !icon.classes().includes("unchecked-icon")
            );

            expect(customIcon).toBeTruthy();
            expect(customIcon!.props("icon")).toBe(item.icon);
        }
    });

    it("renders items without icons correctly", () => {
        const testItem = [
            {
                title: "Item 1",
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
        const wrapper = mount(FormCheckGroup, {
            props: {
                items: testItem,
                type: "radio"
            }
        });

        const formChecks = wrapper.findAllComponents(FormCheck);

        for (const _formCheck of formChecks) {
            const svgIcons = _formCheck.findAllComponents(SvgIcon);
            const customIcon = svgIcons.find(icon =>
                !icon.classes().includes("checked-icon") &&
                !icon.classes().includes("unchecked-icon")
            );
            expect(customIcon).toBeFalsy();
        }
    });

    it("passes down `name`, `required`, `scale`, `type` and any other input attrs to all `<form-check />`s", () => {
        const testName = "test-form-check-group";
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
        const wrapper = mount(FormCheckGroup, {
            props: {
                name: testName,
                required: testRequired,
                scale: testScale,
                type: "radio",
                items: testItem
            }
        });

        const formChecks = wrapper.findAllComponents(FormCheck);

        for (const [_index, _formCheck] of formChecks.entries()) {
            const item = testItem[_index]!;
            const input = _formCheck.find("input") as DOMWrapper<HTMLInputElement>;

            expect(input.attributes("name")).toBe(testName);
            expect(input.attributes("data-custom-attr")).toBe(item.input["data-custom-attr"]);
            expect(input.element.required).toBe(testRequired);
            expect(_formCheck.props("scale")).toBe(testScale);
        }
    });

    it("binds `v-model` correctly", async () => {
        const testItems = [
            {
                title: "Item 1",
                input: { value: "item-1" }
            },
            {
                title: "Item 2",
                input: { value: "item-2" }
            }
        ];

        const wrapper = mount({
            //language=Vue
            template: `
                <form-check-group
                    v-model="selectedValue"
                    :items="items"
                    type="radio" />
            `,
            components: {
                FormCheckGroup
            },
            data: () => ({
                selectedValue: "item-1",
                items: testItems
            })
        });

        // Test initial value
        expect(wrapper.vm.selectedValue).toBe("item-1");

        // Test changing the value
        await wrapper.setData({ selectedValue: "item-2" });
        expect(wrapper.vm.selectedValue).toBe("item-2");
    });

    it("handles `modelValue` changes through `<form-check />` interactions", async () => {
        const testItems = [
            {
                title: "Item 1",
                input: { value: "item-1" }
            },
            {
                title: "Item 2",
                input: { value: "item-2" }
            }
        ];

        const wrapper = mount({
            //language=Vue
            template: `
                <form-check-group
                    v-model="selectedValue"
                    :items="items"
                    type="radio" />
            `,
            components: {
                FormCheckGroup
            },
            data: () => ({
                selectedValue: "item-1",
                items: testItems
            })
        });

        const formChecks = wrapper.findAllComponents(FormCheck);
        const secondInput = formChecks[1]!.find("input") as DOMWrapper<HTMLInputElement>;

        // Click the second radio button
        await secondInput.setValue("item-2");

        // Verify the `modelValue` was updated
        expect(wrapper.vm.selectedValue).toBe("item-2");
    });

    it("renders default slot when `items` and `type` are provided", () => {
        const wrapper = mount(FormCheckGroup, {
            slots: {
                //language=HTML
                default: `
                    <div class="custom-slot-content">Custom content</div>
                `
            }
        });

        expect(wrapper.find(".custom-slot-content").exists()).toBeTruthy();
        expect(wrapper.find(".custom-slot-content").text()).toBe("Custom content");
    });

    it("renders default slot when only `items` is provided but `type` is not", () => {
        const testItems = [{
            title: "Item 1",
            input: { value: "item-1" }
        }];

        const wrapper = mount(FormCheckGroup, {
            props: {
                items: testItems
            },
            slots: {
                //language=HTML
                default: `
                    <div class="custom-slot-content">Custom content</div>
                `
            }
        });

        expect(wrapper.find(".custom-slot-content").exists()).toBeTruthy();
        expect(wrapper.find(".custom-slot-content").text()).toBe("Custom content");
    });

    it("renders default slot when only `type` is provided but `items` is not", () => {
        const wrapper = mount(FormCheckGroup, {
            props: {
                type: "radio"
            },
            slots: {
                //language=HTML
                default: `
                    <div class="custom-slot-content">Custom content</div>
                `
            }
        });

        expect(wrapper.find(".custom-slot-content").exists()).toBeTruthy();
        expect(wrapper.find(".custom-slot-content").text()).toBe("Custom content");
    });

    it("renders `items` instead of slot when both `items` and `type` are provided", () => {
        const testItems = [
            {
                title: "Item 1",
                input: { value: "item-1" }
            }
        ];

        const wrapper = mount(FormCheckGroup, {
            props: {
                items: testItems,
                type: "radio"
            },
            slots: {
                //language=HTML
                default: `
                    <div class="custom-slot-content">Custom content</div>
                `
            }
        });

        expect(wrapper.find(".custom-slot-content").exists()).toBeFalsy();

        const formChecks = wrapper.findAllComponents(FormCheck);
        expect(formChecks).toHaveLength(1);
        expect(formChecks[0]!.find("b").text()).toBe("Item 1");
    });
});
