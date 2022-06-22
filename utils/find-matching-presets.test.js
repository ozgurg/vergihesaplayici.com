import { findMatchingPresets } from "@/utils/find-matching-presets";

describe("utils/find-matching-presets", () => {
    const presets = [
        {
            price: 100
        },
        {
            price: 100
        },
        {
            price: 500
        }
    ];

    it("should return matching presets", () => {
        const matchingPresets = findMatchingPresets(presets, preset => preset.price === 100);
        expect(matchingPresets).toStrictEqual([{ price: 100 }, { price: 100 }]);
    });
});
