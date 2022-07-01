import {
    createCalculatorMatchingPresetIds,
    createCalculatorMatchingPresetTitles,
    findCalculatorMatchingPresets
} from "@/utils/find-calculator-matching-presets";

describe("utils/find-calculator-matching-presets", () => {
    describe("findCalculatorMatchingPresets", () => {
        const presets = [
            {
                price: 100,
                currency: "TRY"
            },
            {
                price: 100,
                currency: "TRY"
            },
            {
                price: 500,
                currency: "EUR"
            },
            {
                price: 999,
                currency: "TRY"
            }
        ];

        it("should return matching presets for calculator", () => {
            const matchingPresets1 = findCalculatorMatchingPresets(presets, {
                price: 100,
                currency: "TRY"
            });
            expect(matchingPresets1).toStrictEqual([
                {
                    price: 100,
                    currency: "TRY"
                },
                {
                    price: 100,
                    currency: "TRY"
                }
            ]);

            const matchingPresets2 = findCalculatorMatchingPresets(presets, {
                price: 500,
                currency: "EUR"
            });
            expect(matchingPresets2).toStrictEqual([
                {
                    price: 500,
                    currency: "EUR"
                }
            ]);
        });

        it("should return matching presets and those priced over 1", () => {
            const matchingPresets1 = findCalculatorMatchingPresets(presets, {
                price: 999,
                currency: "TRY"
            });
            expect(matchingPresets1).toStrictEqual([
                {
                    price: 999,
                    currency: "TRY"
                }
            ]);

            const matchingPresets2 = findCalculatorMatchingPresets(presets, {
                price: 1000,
                currency: "TRY"
            });
            expect(matchingPresets2).toStrictEqual([
                {
                    price: 999,
                    currency: "TRY"
                }
            ]);
        });
    });

    describe("createCalculatorMatchingPresetIds", () => {
        it("should return matching preset IDs as an array", () => {
            const matchingPresets = [
                {
                    id: 1
                },
                {
                    id: 5
                },
                {
                    id: 10
                }
            ];

            const matchingPresetIds = createCalculatorMatchingPresetIds(matchingPresets);
            expect(matchingPresetIds).toStrictEqual([1, 5, 10]);
        });
    });

    describe("createCalculatorMatchingPresetTitles", () => {
        it("should return matching preset titles as an array", () => {
            const matchingPresets = [
                {
                    title: "Preset 1"
                },
                {
                    title: "Preset 2"
                }
            ];

            const matchingPresetTitles = createCalculatorMatchingPresetTitles(matchingPresets);
            expect(matchingPresetTitles).toStrictEqual(["Preset 1", "Preset 2"]);
        });
    });
});
