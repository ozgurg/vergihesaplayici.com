import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import CachedSvg from "@/components/common/cached-svg.vue";

const TEST_SVG = `<svg width="100" height="100"><rect width="200" height="200"></rect></svg>`;

describe("components/common/cached-svg.vue", () => {
    it("renders `<svg-fragment />` with provided SVG", () => {
        const wrapper = mount(CachedSvg, {
            props: { svg: TEST_SVG }
        });

        expect(wrapper.html({ raw: true })).toContain(TEST_SVG);
    });

    it("passes down additional attrs to `<svg-fragment />`", () => {
        const wrapper = mount(CachedSvg, {
            props: {
                svg: TEST_SVG
            },
            attrs: {
                id: "test-id",
                class: "test-class"
            }
        });

        const svgFragment = wrapper.find("svg");
        expect(svgFragment.attributes()).toStrictEqual({
            width: "100",
            height: "100",
            id: "test-id",
            class: "test-class"
        });
    });
});
