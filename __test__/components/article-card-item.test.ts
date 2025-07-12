import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import { testRootClass } from "@root/__test__/utils.js";
import ArticleCardItem from "@/components/article-card-item.vue";

const TEST_ARTICLE = {
    title: "Test Title",
    description: "Test Description",
    url: new URL("https://vergihesaplayici.com"),
    date: new Date("2025-01-01")
};

describe("components/article-card-item.vue", () => {
    testRootClass(ArticleCardItem, "article-card-item", { props: TEST_ARTICLE });

    it("renders card correctly", () => {
        const wrapper = mount(ArticleCardItem, {
            props: TEST_ARTICLE
        });
        expect(wrapper.html({ raw: true })).toMatchSnapshot();
    });
});
