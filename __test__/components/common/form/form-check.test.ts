import type { DOMWrapper } from "@vue/test-utils";
import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { testDefaultSlot, testRootClass } from "@root/__test__/utils.js";
import FormCheck from "@/components/common/form/form-check.vue";

describe("components/common/form/form-check.vue", () => {
    testDefaultSlot(FormCheck, { props: { type: "radio", value: "check" } });
    testRootClass(FormCheck, "form-check", { props: { type: "radio", value: "check" } });

    it("applies the `scale` class", () => {
        const wrapper = mount(FormCheck, {
            props: { type: "radio", value: "check", scale: "small" }
        });
        expect(wrapper.classes()).toContain("form-check-scale-small");
    });

    it("uses the generated ID for both the `for` attr and the `<input />`'s `id` attr", () => {
        const wrapper = mount(FormCheck, { props: { type: "radio", value: "check" } });
        expect(wrapper.attributes("for")).toBe(wrapper.find("input").attributes("id"));
    });

    it("generates a unique `for` value for each instance", () => {
        const wrapper = mount({
            //language=Vue
            template: `
                <form-check type="radio" value="check-1" />
                <form-check type="radio" value="check-2" />
            `,
            components: {
                FormCheck
            }
        });
        const FormChecks = wrapper.findAllComponents(FormCheck);
        expect(FormChecks[0]!.attributes("for")).not.toBe(FormChecks[1]!.attributes("for"));
    });

    it("binds `v-model` correctly for radio buttons", async () => {
        const wrapper = mount({
            //language=Vue
            template: `
                <form-check v-model="selection" type="radio" value="check-1" />
                <form-check v-model="selection" type="radio" value="check-2" />
            `,
            components: {
                FormCheck
            },
            data: () => ({
                selection: "check-1"
            })
        });

        const formChecks = wrapper.findAll("input") as DOMWrapper<HTMLInputElement>[];

        expect(formChecks[0]!.element.checked).toBeTruthy();
        expect(formChecks[1]!.element.checked).toBeFalsy();

        await formChecks[1]!.setValue("check-2");

        expect(formChecks[1]!.element.checked).toBeTruthy();
        expect(formChecks[0]!.element.checked).toBeFalsy();
    });

    it("binds `v-model` correctly for single checkbox", async () => {
        const wrapper = mount({
            //language=Vue
            template: `
                <form-check v-model="selection" type="checkbox" value="check-1" />
            `,
            components: {
                FormCheck
            },
            data: () => ({
                selection: false
            })
        });

        const input = wrapper.find("input") as DOMWrapper<HTMLInputElement>;

        expect(input.element.checked).toBeFalsy();

        await input.setValue(true);

        expect(input.element.checked).toBeTruthy();
        expect(wrapper.vm.selection).toBe("check-1");
    });

    it("binds `v-model` correctly for checkbox with custom unchecked value", async () => {
        const wrapper = mount({
            //language=Vue
            template: `
                <form-check v-model="selection" type="checkbox" value="check-1" unchecked-value="unchecked" />
            `,
            components: {
                FormCheck
            },
            data: () => ({
                selection: "unchecked"
            })
        });

        const input = wrapper.find("input") as DOMWrapper<HTMLInputElement>;

        expect(input.element.checked).toBeFalsy();

        await input.setValue(true);
        expect(wrapper.vm.selection).toBe("check-1");

        await input.setValue(false);
        expect(wrapper.vm.selection).toBe("unchecked");
    });

    it("binds `v-model` correctly for checkbox array", async () => {
        const wrapper = mount({
            //language=Vue
            template: `
                <form-check v-model="selection" type="checkbox" value="check-1" />
                <form-check v-model="selection" type="checkbox" value="check-2" />
                <form-check v-model="selection" type="checkbox" value="check-3" />
            `,
            components: {
                FormCheck
            },
            data: () => ({
                selection: ["check-1"]
            })
        });

        const inputs = wrapper.findAll("input") as DOMWrapper<HTMLInputElement>[];

        expect(inputs[0]!.element.checked).toBeTruthy();
        expect(inputs[1]!.element.checked).toBeFalsy();
        expect(inputs[2]!.element.checked).toBeFalsy();

        // Add `check-2` to selection
        await inputs[1]!.setValue(true);
        expect(wrapper.vm.selection).toEqual(["check-1", "check-2"]);

        // Remove `check-1` from selection
        await inputs[0]!.setValue(false);
        expect(wrapper.vm.selection).toEqual(["check-2"]);

        // Add `check-3` to selection
        await inputs[2]!.setValue(true);
        expect(wrapper.vm.selection).toEqual(["check-2", "check-3"]);
    });

    it("handles checkbox array with empty initial value", async () => {
        const wrapper = mount({
            //language=Vue
            template: `
                <form-check v-model="selection" type="checkbox" value="check-1" />
                <form-check v-model="selection" type="checkbox" value="check-2" />
            `,
            components: {
                FormCheck
            },
            data: () => ({
                selection: []
            })
        });

        const inputs = wrapper.findAll("input") as DOMWrapper<HTMLInputElement>[];

        expect(inputs[0]!.element.checked).toBeFalsy();
        expect(inputs[1]!.element.checked).toBeFalsy();

        await inputs[0]!.setValue(true);
        expect(wrapper.vm.selection).toEqual(["check-1"]);

        await inputs[1]!.setValue(true);
        expect(wrapper.vm.selection).toEqual(["check-1", "check-2"]);
    });

    it("handles checkbox array with duplicate values", async () => {
        const wrapper = mount({
            //language=Vue
            template: `
                <form-check v-model="selection" type="checkbox" value="check-1" />
                <form-check v-model="selection" type="checkbox" value="check-1" />
            `,
            components: {
                FormCheck
            },
            data: () => ({
                selection: []
            })
        });

        const inputs = wrapper.findAll("input") as DOMWrapper<HTMLInputElement>[];

        await inputs[0]!.setValue(true);
        expect(wrapper.vm.selection).toEqual(["check-1"]);

        await inputs[1]!.setValue(true);
        expect(wrapper.vm.selection).toEqual(["check-1"]); // Should not duplicate

        await inputs[0]!.setValue(false);
        expect(wrapper.vm.selection).toEqual([]); // Both checkboxes share the same value, so unchecking one removes it

        await inputs[1]!.setValue(true);
        expect(wrapper.vm.selection).toEqual(["check-1"]);

        await inputs[1]!.setValue(false);
        expect(wrapper.vm.selection).toEqual([]);
    });

    it("renders checkbox icons correctly", () => {
        const wrapper = mount(FormCheck, {
            props: { type: "checkbox", value: "check" }
        });

        const checkedIcon = wrapper.find(".checked-icon");
        const uncheckedIcon = wrapper.find(".unchecked-icon");

        expect(checkedIcon.exists()).toBeTruthy();
        expect(uncheckedIcon.exists()).toBeTruthy();
    });

    it("renders radio icons correctly", () => {
        const wrapper = mount(FormCheck, {
            props: { type: "radio", value: "check" }
        });

        const checkedIcon = wrapper.find(".checked-icon");
        const uncheckedIcon = wrapper.find(".unchecked-icon");

        expect(checkedIcon.exists()).toBeTruthy();
        expect(uncheckedIcon.exists()).toBeTruthy();
    });

    it("handles checkbox with default unchecked value", async () => {
        const wrapper = mount({
            //language=Vue
            template: `
                <form-check v-model="selection" type="checkbox" value="check-1" />
            `,
            components: {
                FormCheck
            },
            data: () => ({
                selection: false
            })
        });

        const input = wrapper.find("input") as DOMWrapper<HTMLInputElement>;

        await input.setValue(true);
        expect(wrapper.vm.selection).toBe("check-1");

        await input.setValue(false);
        expect(wrapper.vm.selection).toBe(false);
    });
});
