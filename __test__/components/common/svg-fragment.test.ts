import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import SvgFragment from "@/components/common/svg-fragment.vue";

describe("components/common/svg-fragment.vue", () => {
    it("renders `<svg />` with correct attrs and content", () => {
        const wrapper = mount(SvgFragment, {
            props: {
                html: `<svg width="100" height="100"><rect width="100" height="100"></rect></svg>`
            }
        });

        const svg = wrapper.find("svg");
        expect(svg.exists()).toBeTruthy();
        expect(svg.attributes("width")).toBe("100");
        expect(svg.attributes("height")).toBe("100");
        expect(svg.html()).toContain("<rect width=\"100\" height=\"100\"></rect>");
    });

    it("does not include an extra wrapper", () => {
        const testHtml = `<svg><circle cx="50" cy="50" r="50"></circle></svg>`;
        const wrapper = mount(SvgFragment, {
            props: { html: testHtml }
        });

        expect(wrapper.html({ raw: true })).toBe(testHtml);
    });

    it("handles empty `<svg />` correctly", () => {
        const wrapper = mount(SvgFragment, {
            props: { html: "<svg></svg>" }
        });
        expect(wrapper.html()).toBe("<svg></svg>");
    });

    it("extracts multiple attrs correctly", () => {
        const wrapper = mount(SvgFragment, {
            props: {
                html: `<svg width="200" height="150" viewBox="0 0 200 150" aria-hidden="true" data-test-attr="test-value" no-value-attr></svg>`
            }
        });

        const svg = wrapper.find("svg");
        expect(svg.attributes("width")).toBe("200");
        expect(svg.attributes("height")).toBe("150");
        expect(svg.attributes("viewBox")).toBe("0 0 200 150");
        expect(svg.attributes("aria-hidden")).toBe("true");
        expect(svg.attributes("data-test-attr")).toBe("test-value");
        expect(svg.attributes("no-value-attr")).toBe("");
    });
});
