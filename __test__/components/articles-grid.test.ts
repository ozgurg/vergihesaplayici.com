import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import ArticleCardItem from "@/components/article-card-item.vue";
import ArticlesGrid from "@/components/articles-grid.vue";

describe("components/articles-grid.vue", () => {
    it("renders given items as `<article-card-item />`", () => {
        const testItems = [
            {
                title: "Test Title 1",
                description: "Test Description 1",
                url: new URL("https://vergihesaplayici.com/article-1"),
                date: new Date("2025-01-01")
            },
            {
                title: "Test Title 2",
                description: "Test Description 2",
                url: new URL("https://vergihesaplayici.com/article-2"),
                date: new Date("2025-01-02")
            }
        ];

        const wrapper = mount(ArticlesGrid, {
            props: { items: testItems }
        });

        const articleCardItems = wrapper.findAllComponents(ArticleCardItem);

        expect(articleCardItems.length).toBe(testItems.length);

        for (const [_index, _articleCardItem] of articleCardItems.entries()) {
            const item = testItems[_index]!;
            expect(_articleCardItem.props()).toEqual({
                title: item.title,
                description: item.description,
                url: item.url,
                date: item.date
            });
        }
    });
});
