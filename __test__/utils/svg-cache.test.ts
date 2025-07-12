import { describe, expect, it } from "vitest";
import { getSvgCache, setSvgCache } from "@/utils/svg-cache.js";

const TEST_SVG_1 = "<svg width=\"100\" height=\"100\"><circle cx=\"50\" cy=\"50\" r=\"40\" /></svg>";
const TEST_SVG_2 = "<svg width=\"200\" height=\"200\"><rect width=\"100\" height=\"100\" /></svg>";

describe("utils/svg-cache.js", () => {
    it("caches a new `<svg />` and return a unique key", () => {
        const key = setSvgCache(TEST_SVG_1);
        expect(key).toBeTypeOf("string");

        const entries = getSvgCache();
        expect(entries.length).toBe(1);
        expect(entries[0]).toEqual([key, TEST_SVG_1]);
    });

    it("should not duplicate the exact same `<svg />`", () => {
        const key1 = setSvgCache(TEST_SVG_1);
        const key2 = setSvgCache(TEST_SVG_1);

        expect(key1).toBe(key2);
        expect(getSvgCache().length).toBe(1);
    });

    it("assigns a new key to every different `<svg />`s", () => {
        const key1 = setSvgCache(TEST_SVG_1);
        const key2 = setSvgCache(TEST_SVG_2);

        expect(key1).not.toBe(key2);
        expect(getSvgCache().length).toBe(2);
    });

    it("converts `<svg />` to `<symbol />` string correctly", () => {
        const key = setSvgCache(TEST_SVG_1);
        const expected = TEST_SVG_1
            .replace("<svg ", `<symbol id="${key}"`)
            .replace("</svg>", "</symbol>");
        const result = svgToSymbol(key, TEST_SVG_1);

        expect(result).toBe(expected);
    });
});
