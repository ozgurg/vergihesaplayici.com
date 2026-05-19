import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import ArticleCardItem from "@/components/article-card-item.vue";
import ArticlesGrid from "@/components/articles-grid.vue";

describe("components/articles-grid.vue", () => {
    it("renders given items as `<article-card-item />`", () => {
        const testItems = [
            {
                title: "Test Title 1",
                slug: "test-title-1",
                description: "Test Description 1",
                createdDate: new Date("2025-01-01"),
                updatedDate: null,
                entry: {
                    body: "This is a test body of the article 1."
                }
            },
            {
                title: "Test Title 2",
                slug: "test-title-2",
                description: "Test Description 2",
                createdDate: new Date("2025-01-02"),
                updatedDate: null,
                entry: {
                    body: "This is a test body of the article 2."
                }
            }
        ];

        const wrapper = mount(ArticlesGrid, {
            props: { items: testItems as any, titleTag: "h2" }
        });

        const articleCardItems = wrapper.findAllComponents(ArticleCardItem as any);

        expect(articleCardItems.length).toBe(testItems.length);

        for (const [_index, _articleCardItem] of articleCardItems.entries()) {
            const item = testItems[_index]!;
            expect((_articleCardItem as any).props()).toEqual({
                yazi: item,
                titleTag: "h2"
            });
        }
    });
});
