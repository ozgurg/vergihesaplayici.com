import { describe, expect, it, vi } from "vitest";
import type { Yazi } from "@/domains/yazilar/types.js";
import { mapYazilarForArticlesGridComponent } from "@/domains/yazilar/utils.js";

const mockYazilarSlugPageDef = (data: { yazi: Yazi }) => ({
    title: data.yazi.title,
    url: new URL(`https://vergihesaplayici.com/yazilar/${data.yazi.slug}/`)
});

vi.mock("./YazilarSlugPageDef.js", () => ({
    YazilarSlugPageDef: vi.fn(mockYazilarSlugPageDef)
}));

describe("domains/yazilar/utils.js", () => {
    describe("mapYazilarForArticlesGridComponent", () => {
        it("should map `yazilar` to `ArticlesGridProps['items']` correctly", () => {
            const yazilar: Yazi[] = [
                {
                    slug: "test-slug-1",
                    title: "Test Title 1",
                    description: "Test description 1",
                    createdDate: new Date("2025-01-01"),
                    updatedDate: new Date("2025-02-01"),
                    entry: {} as any
                },
                {
                    slug: "test-slug-2",
                    title: "Test Title 2",
                    description: "Test description 2",
                    createdDate: new Date("2025-01-02"),
                    updatedDate: null,
                    entry: {} as any
                }
            ];

            const result = mapYazilarForArticlesGridComponent(yazilar);
            expect(result).toStrictEqual([
                {
                    title: "Test Title 1",
                    description: "Test description 1",
                    url: new URL("https://vergihesaplayici.com/yazilar/test-slug-1/"),
                    date: new Date("2025-02-01")
                },
                {
                    title: "Test Title 2",
                    description: "Test description 2",
                    url: new URL("https://vergihesaplayici.com/yazilar/test-slug-2/"),
                    date: new Date("2025-01-02")
                }
            ]);
        });

        it("should return an empty array if `yazilar` is empty", () => {
            const yazilar: Yazi[] = [];
            const result = mapYazilarForArticlesGridComponent(yazilar);
            expect(result).toEqual([]);
        });
    });
});
