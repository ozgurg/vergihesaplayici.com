import { flushPromises, mount } from "@vue/test-utils";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { testAttrPassingToRoot, testRootClass } from "@root/__test__/utils.js";
import { siteUrl } from "@/utils/url.js";
import Breadcrumbs from "@/components/common/breadcrumbs.vue";

const MOCK_ACTIVE_ITEM = {
    title: "KDV Hesaplayıcı",
    url: siteUrl("/kdv-hesaplayici")
};

const MOCK_ITEMS = [
    { title: "Ana Sayfa", url: siteUrl() },
    { title: "Hesaplayıcılar", url: siteUrl("/hesaplayicilar") },
    MOCK_ACTIVE_ITEM
];

const MOCK_SCROLL_WIDTH = 500;

describe("components/common/breadcrumbs.vue", () => {
    let mockScrollTo: ReturnType<typeof vi.fn>;

    beforeEach(() => {
        mockScrollTo = vi.fn();

        Element.prototype.scrollTo = mockScrollTo;
        Object.defineProperty(Element.prototype, "scrollWidth", {
            get: () => MOCK_SCROLL_WIDTH
        });
    });

    testAttrPassingToRoot(Breadcrumbs, { props: { items: MOCK_ITEMS } });
    testRootClass(Breadcrumbs, "breadcrumbs", { props: { items: MOCK_ITEMS } });

    it("renders breadcrumbs correctly with given items", () => {
        const wrapper = mount(Breadcrumbs, {
            props: { items: MOCK_ITEMS }
        });

        const breadcrumbItems = wrapper.findAll(`li[aria-current="false"] > a`);
        expect(breadcrumbItems).toHaveLength(MOCK_ITEMS.length - 1);

        for (const [_index, _breadcrumbItem] of breadcrumbItems.entries()) {
            const mockItem = MOCK_ITEMS[_index]!;
            expect(_breadcrumbItem.text()).toBe(mockItem.title);
            expect(_breadcrumbItem.attributes("href")).toBe(mockItem.url.href);
        }

        const activeBreadcrumbItem = wrapper.find(`li[aria-current="page"] > span`);
        expect(activeBreadcrumbItem.text()).toBe(MOCK_ACTIVE_ITEM.title);
    });

    it("displays dividers between breadcrumbs except for last item", () => {
        const wrapper = mount(Breadcrumbs, {
            props: { items: MOCK_ITEMS }
        });

        const dividers = wrapper.findAll(`li.breadcrumbs-divider[aria-hidden="true"]`);
        expect(dividers).toHaveLength(MOCK_ITEMS.length - 1);
    });

    it("scrolls to end when it is mounted", async () => {
        mount(Breadcrumbs, {
            props: { items: MOCK_ITEMS }
        });

        await flushPromises();

        expect(mockScrollTo).toHaveBeenCalledWith({
            left: MOCK_SCROLL_WIDTH,
            behavior: "instant"
        });
    });
});
