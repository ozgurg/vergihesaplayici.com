import { describe, expect, it, vi } from "vitest";
import { mount } from "@vue/test-utils";
import FormControl from "@/components/common/form/form-control.vue";
import FormControlNumber from "@/components/common/form/form-control-number.vue";

describe("components/common/form/form-control-number.vue", () => {
    it("renders a `<form-control />` with correct attrs", () => {
        const wrapper = mount(FormControlNumber);

        const formControl = wrapper.findComponent(FormControl);
        const formControlInput = formControl.find("input");
        expect(formControl.exists()).toBeTruthy();
        expect(formControlInput.attributes("inputmode")).toBe("numeric");
        expect(formControlInput.attributes("type")).toBe("text");
    });

    it("sets `modelValue` correctly when `displayValue` set", () => {
        const wrapper = mount(FormControlNumber, {
            props: { modelValue: 1_000 }
        });

        // @ts-expect-error: FIXME
        wrapper.vm.displayValue = "2000";
        expect(wrapper.vm.modelValue).toBe(2_000);
        expect(wrapper.vm.modelValue).toBeTypeOf("number");

        // @ts-expect-error: FIXME
        wrapper.vm.displayValue = "3.000";
        expect(wrapper.vm.modelValue).toBe(3_000);
        expect(wrapper.vm.modelValue).toBeTypeOf("number");

        // @ts-expect-error: FIXME
        wrapper.vm.displayValue = "4.000,00";
        expect(wrapper.vm.modelValue).toBe(4_000);
        expect(wrapper.vm.modelValue).toBeTypeOf("number");
    });

    it("formats `displayValue` correctly using default `locale` value", () => {
        const wrapper = mount(FormControlNumber, {
            props: { modelValue: 1_234.56 }
        });
        // @ts-expect-error: FIXME
        expect(wrapper.vm.displayValue).toBe("1.234,56");
    });

    it("formats `displayValue` correctly using `locale`", () => {
        const wrapper = mount(FormControlNumber, {
            props: { modelValue: 1_234.56, locale: "en-US" }
        });
        // @ts-expect-error: FIXME
        expect(wrapper.vm.displayValue).toBe("1,234.56");
    });

    it("prevents input of disallowed keys", () => {
        const mockEvent = {
            key: "a",
            preventDefault: vi.fn(),
            ctrlKey: false,
            metaKey: false
        };
        const wrapper = mount(FormControlNumber);

        // @ts-expect-error: FIXME
        wrapper.vm.preventDisallowedKeyInput(mockEvent);
        expect(mockEvent.preventDefault).toHaveBeenCalled();
    });

    it("allows numeric key input", () => {
        const mockEvent = {
            key: "5",
            preventDefault: vi.fn(),
            ctrlKey: false,
            metaKey: false
        };
        const wrapper = mount(FormControlNumber);

        // @ts-expect-error: FIXME
        wrapper.vm.preventDisallowedKeyInput(mockEvent);
        expect(mockEvent.preventDefault).not.toHaveBeenCalled();
    });

    it("allows allowed non-numeric key input", () => {
        const mockEvent = {
            key: "Backspace",
            preventDefault: vi.fn(),
            ctrlKey: false,
            metaKey: false
        };
        const wrapper = mount(FormControlNumber);

        // @ts-expect-error: FIXME
        wrapper.vm.preventDisallowedKeyInput(mockEvent);
        expect(mockEvent.preventDefault).not.toHaveBeenCalled();
    });

    it("allows input with `ctrlKey` or `metaKey`", () => {
        const mockEventCtrlKey = {
            key: "a",
            preventDefault: vi.fn(),
            ctrlKey: true,
            metaKey: false
        };
        const wrapperCtrlKey = mount(FormControlNumber);
        // @ts-expect-error: FIXME
        wrapperCtrlKey.vm.preventDisallowedKeyInput(mockEventCtrlKey);
        expect(mockEventCtrlKey.preventDefault).not.toHaveBeenCalled();

        const mockEventMetaKey = {
            key: "a",
            preventDefault: vi.fn(),
            ctrlKey: true,
            metaKey: false
        };
        const wrapperMetaKey = mount(FormControlNumber);
        // @ts-expect-error: FIXME
        wrapperMetaKey.vm.preventDisallowedKeyInput(mockEventMetaKey);
        expect(mockEventMetaKey.preventDefault).not.toHaveBeenCalled();
    });

    // We tested other functionalities in previous tests
    it("calls keydown handler when a key is pressed", async () => {
        const wrapper = mount(FormControlNumber);

        // @ts-expect-error: FIXME
        const preventDisallowedKeyInputSpy = vi.spyOn(wrapper.vm, "preventDisallowedKeyInput");

        const input = wrapper.find("input");

        await input.trigger("keydown", { key: "a" });

        expect(preventDisallowedKeyInputSpy).toHaveBeenCalled();
    });

    it("binds `v-model` correctly", async () => {
        let testModelValue = 150;
        const wrapper = mount(FormControlNumber, {
            props: {
                modelValue: testModelValue,
                "onUpdate:modelValue": (value) => {
                    testModelValue = value as number;
                }
            }
        });

        const input = wrapper.find("input");
        await input.setValue(300);
        expect(testModelValue).toBe(300);
        expect(wrapper.emitted("update:modelValue")?.[0]).toEqual([testModelValue]);
    });
});
