import { findCalculatorPresetBySlug } from "@/utils/find-calculator-preset-by-slug.js";

describe("utils/find-calculator-preset-by-slug", () => {
    it("should return correct preset by slug", () => {
        const presets = [
            {
                title: "iPhone SE (2022)",
                slug: "iphone-se-2022"
            },
            {
                title: "iPhone 14",
                slug: "iphone-14"
            }
        ];
        expect(findCalculatorPresetBySlug("iphone-14", presets)).toStrictEqual({
            title: "iPhone 14",
            slug: "iphone-14"
        });
        expect(findCalculatorPresetBySlug("iphone-0", presets)).toBeUndefined();
    });
});
