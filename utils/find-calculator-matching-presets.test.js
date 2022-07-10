import {
    createCalculatorMatchingPresetIds,
    createCalculatorMatchingPresetTitles,
    findCalculatorMatchingPresets
} from "@/utils/find-calculator-matching-presets";

describe("utils/find-calculator-matching-presets", () => {
    describe("findCalculatorMatchingPresets", () => {
        const presets = [
            {
                form: { price: 100, currency: "TRY" }
            },
            {
                form: { price: 100, currency: "TRY" }
            },
            {
                form: { price: 500, currency: "EUR" }
            },
            {
                form: { price: 999, currency: "TRY" }
            },
            {
                form: { price: 349.99, currency: "TRY" }
            }
        ];

        it("should return matching presets for calculator", () => {
            const matchingPresets1 = findCalculatorMatchingPresets(presets, {
                price: 100,
                currency: "TRY"
            });
            expect(matchingPresets1).toStrictEqual([
                {
                    form: { price: 100, currency: "TRY" }
                },
                {
                    form: { price: 100, currency: "TRY" }
                }
            ]);

            const matchingPresets2 = findCalculatorMatchingPresets(presets, {
                price: 500,
                currency: "EUR"
            });
            expect(matchingPresets2).toStrictEqual([
                {
                    form: { price: 500, currency: "EUR" }
                }
            ]);
        });

        it("should return matching presets and those priced over 1", () => {
            const matchingPresets1 = findCalculatorMatchingPresets(presets, {
                price: 350,
                currency: "TRY"
            });
            expect(matchingPresets1).toStrictEqual([
                {
                    form: { price: 349.99, currency: "TRY" }
                }
            ]);

            const matchingPresets2 = findCalculatorMatchingPresets(presets, {
                price: 1000,
                currency: "TRY"
            });
            expect(matchingPresets2).toStrictEqual([
                {
                    form: { price: 999, currency: "TRY" }
                }
            ]);
        });

        it("should return no matching presets if price over 1", () => {
            const matchingPresets = findCalculatorMatchingPresets(presets, {
                price: 350.99,
                currency: "TRY"
            });
            expect(matchingPresets).toStrictEqual([]);
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
