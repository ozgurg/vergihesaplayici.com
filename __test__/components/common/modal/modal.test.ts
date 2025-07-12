import type { DOMWrapper } from "@vue/test-utils";
import { mount } from "@vue/test-utils";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { testAttrPassingToRoot, testDefaultSlot, testRootClass } from "@root/__test__/utils.js";
import Modal from "@/components/common/modal/modal.vue";

describe("components/common/modal/modal.vue", () => {
    let mockShowModal: ReturnType<typeof vi.fn>;
    let mockClose: ReturnType<typeof vi.fn>;

    beforeEach(() => {
        mockShowModal = vi.fn();
        mockClose = vi.fn();

        HTMLDialogElement.prototype.showModal = mockShowModal;
        HTMLDialogElement.prototype.close = mockClose;
    });

    testDefaultSlot(Modal);
    testAttrPassingToRoot(Modal);
    testRootClass(Modal, "modal");

    it("is closed by default", () => {
        const wrapper = mount(Modal);
        expect(wrapper.vm.modelValue).toBeFalsy();
    });

    it("accepts initial `modelValue`", () => {
        const wrapper = mount(Modal, {
            props: {
                modelValue: true
            }
        });
        expect(wrapper.vm.modelValue).toBeTruthy();
    });

    it("binds `v-model` correctly", async () => {
        let testModelValue: any;
        const wrapper = mount(Modal, {
            props: {
                modelValue: testModelValue,
                "onUpdate:modelValue": (value: any) => {
                    testModelValue = value;
                }
            }
        });

        await wrapper.setValue(true);
        expect(testModelValue).toBeTruthy();
        expect(wrapper.emitted("update:modelValue")?.[0]).toEqual([true]);
    });

    it("calls `showModal` if `modelValue` is `true`", async () => {
        const wrapper = mount(Modal, {
            props: {
                modelValue: false
            }
        });

        await wrapper.setProps({ modelValue: true });
        await wrapper.vm.$nextTick();
        expect(mockShowModal).toHaveBeenCalledTimes(1);
    });

    it("calls `close` if `modelValue` is `false`", async () => {
        const wrapper = mount(Modal, {
            props: {
                modelValue: true
            }
        });

        await wrapper.setProps({ modelValue: false });
        await wrapper.vm.$nextTick();
        expect(mockClose).toHaveBeenCalledTimes(1);
    });

    it("calls `showModal` immediately if mounted with `modelValue` `true`", async () => {
        const wrapper = mount(Modal, {
            props: {
                modelValue: true
            }
        });

        await wrapper.vm.$nextTick();
        expect(mockShowModal).toHaveBeenCalledTimes(1);
    });

    it("closes modal on backdrop click", async () => {
        const wrapper = mount(Modal, {
            props: {
                modelValue: true
            }
        });

        const dialog = wrapper.find("dialog") as DOMWrapper<HTMLDialogElement>;

        // @ts-expect-error: FIXME
        const closeOnBackdropClickSpy = vi.spyOn(wrapper.vm, "closeOnBackdropClick");

        await dialog.trigger("click");

        expect(closeOnBackdropClickSpy).toHaveBeenCalled();
        expect(wrapper.emitted("update:modelValue")?.[0]).toEqual([false]);
        expect(mockClose).toHaveBeenCalledTimes(1);
        expect(wrapper.vm.modelValue).toBeFalsy();
    });

    it("does not close modal on content click", async () => {
        const wrapper = mount(Modal, {
            props: {
                modelValue: true
            }
        });

        const dialog = wrapper.find("dialog") as DOMWrapper<HTMLDialogElement>;
        const content = dialog.find(".modal-content");

        // @ts-expect-error: FIXME
        const closeOnBackdropClickSpy = vi.spyOn(wrapper.vm, "closeOnBackdropClick");

        await content.trigger("click");

        expect(closeOnBackdropClickSpy).toHaveBeenCalled();
        expect(wrapper.emitted("update:modelValue")).toBeFalsy();
        expect(mockClose).toHaveBeenCalledTimes(0);
        expect(wrapper.vm.modelValue).toBeTruthy();
    });

    it("closes modal on dialog close event", async () => {
        const wrapper = mount(Modal, {
            props: {
                modelValue: true
            }
        });

        const dialog = wrapper.find("dialog") as DOMWrapper<HTMLDialogElement>;

        await dialog.trigger("close");

        await wrapper.vm.$nextTick();

        expect(wrapper.emitted("update:modelValue")?.[0]).toEqual([false]);
        expect(mockClose).toHaveBeenCalledTimes(1);
        expect(wrapper.vm.modelValue).toBeFalsy();
    });
});
