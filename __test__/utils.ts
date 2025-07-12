import type { Component } from "vue";
import type { ComponentMountingOptions } from "@vue/test-utils";
import { mount } from "@vue/test-utils";
import { expect, it } from "vitest";

const TEST_CONTENT = {
    slotHtml: "<p>Default Slot Content</p>",
    attrs: {
        id: "passed-id",
        title: "Passed Title",
        class: "passed-class"
    }
};

export const testDefaultSlot = <T>(component: Component, options?: ComponentMountingOptions<T>): void => {
    it("renders default slot content", () => {
        const wrapper = mount(component, {
            ...options,
            slots: {
                default: TEST_CONTENT.slotHtml
            }
        });
        expect(wrapper.html()).toContain(TEST_CONTENT.slotHtml);
    });
};

export const testAttrPassingToRoot = <T>(component: Component, options?: ComponentMountingOptions<T>): void => {
    it("applies passed attrs to root element", () => {
        const wrapper = mount(component, {
            ...options,
            attrs: TEST_CONTENT.attrs
        });
        expect(wrapper.attributes("id")).toBe(TEST_CONTENT.attrs.id);
        expect(wrapper.attributes("title")).toBe(TEST_CONTENT.attrs.title);
        expect(wrapper.classes()).toContain(TEST_CONTENT.attrs.class);
    });
};

export const testRootClass = <T>(component: Component, rootClass: string, options?: ComponentMountingOptions<T>): void => {
    it("renders with correct root class", () => {
        const wrapper = mount(component, { ...options });
        expect(wrapper.classes()).toContain(rootClass);
    });
};
