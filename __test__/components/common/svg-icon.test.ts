import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import { testAttrPassingToRoot, testRootClass } from "@root/__test__/utils.js";
import CachedSvg from "@/components/common/cached-svg.vue";
import SvgIcon from "@/components/common/svg-icon.vue";

describe("components/common/svg-icon.vue", () => {
    testAttrPassingToRoot(SvgIcon, { props: { icon: "<svg></svg>" } });
    testRootClass(SvgIcon, "svg-icon", { props: { icon: "<svg></svg>" } });

    it("passes down `icon` to `<cached-svg />`", () => {
        const testIcon = "<svg></svg>";
        const wrapper = mount(SvgIcon, {
            props: { icon: testIcon }
        });

        const cachedSvg = wrapper.findComponent(CachedSvg);
        expect(cachedSvg.exists()).toBeTruthy();
        expect(cachedSvg.props("svg")).toBe(testIcon);
    });

    it("has correct `aria-hidden`", () => {
        const testIcon = "<svg></svg>";
        const wrapper = mount(SvgIcon, {
            props: { icon: testIcon }
        });

        expect(wrapper.attributes("aria-hidden")).toBe("true");
    });
});
