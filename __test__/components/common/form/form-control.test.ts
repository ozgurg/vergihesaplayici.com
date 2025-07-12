import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import { testRootClass } from "@root/__test__/utils.js";
import FormControl from "@/components/common/form/form-control.vue";

describe("components/common/form/form-control.vue", () => {
    testRootClass(FormControl, "form-control");

    it("applies passed attrs to `<input />`", () => {
        const testAttrs = {
            id: "passed-id",
            title: "Passed Title"
        };
        const wrapper = mount(FormControl, {
            attrs: testAttrs
        });

        const input = wrapper.find("input");
        expect(input.attributes("id")).toBe(testAttrs.id);
        expect(input.attributes("title")).toBe(testAttrs.title);
    });

    it("applies `scale` class", () => {
        const wrapper = mount(FormControl, {
            props: { scale: "small" }
        });
        expect(wrapper.classes()).toContain("form-control-scale-small");
    });

    it("binds `v-model` correctly", async () => {
        let testModelValue: any = "Turkey";
        const wrapper = mount(FormControl, {
            props: {
                modelValue: testModelValue,
                "onUpdate:modelValue": (value: any) => {
                    testModelValue = value;
                }
            }
        });

        const input = wrapper.find("input");
        await input.setValue("Türkiye");
        expect(testModelValue).toBe("Türkiye");
        expect(wrapper.emitted("update:modelValue")?.[0]).toEqual([testModelValue]);
    });

    it("applies `aria-labelledby` if passed", () => {
        const testAriaLabelledby = "test-aria-labelledby";
        const testFormGroupId = "test-form-group";
        const wrapper = mount(FormControl, {
            props: {
                "aria-labelledby": testAriaLabelledby
            },
            global: {
                provide: {
                    "form-group.id": testFormGroupId
                }
            }
        });
        const input = wrapper.find("input");
        expect(input.attributes("aria-labelledby")).toBe(testAriaLabelledby);
    });

    it("applies injected `form-group.id` as `aria-labelledby`", () => {
        const testFormGroupId = "test-form-group";
        const wrapper = mount(FormControl, {
            global: {
                provide: {
                    "form-group.id": testFormGroupId
                }
            }
        });
        const input = wrapper.find("input");
        expect(input.attributes("aria-labelledby")).toBe(testFormGroupId);
    });
});
