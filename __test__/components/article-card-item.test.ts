import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import { testRootClass } from "@root/__test__/utils.js";
import ArticleCardItem from "@/components/article-card-item.vue";

const TEST_ARTICLE = {
    title: "Test Title",
    slug: "test-title",
    description: "Test Description",
    createdDate: new Date("2025-01-01"),
    updatedDate: null,
    entry: {
        body: "This is a test body of the article."
    }
};

describe("components/article-card-item.vue", () => {
    testRootClass(ArticleCardItem, "article-card-item", { props: { yazi: TEST_ARTICLE as any, titleTag: "h3" } });

    it("renders card correctly", () => {
        const wrapper = mount(ArticleCardItem, {
            props: { yazi: TEST_ARTICLE as any, titleTag: "h3" }
        });
        expect(wrapper.html({ raw: true })).toMatchSnapshot();
    });
});
