import { findCalculatorMatchingPresets } from "@/utils/find-calculator-matching-presets";

describe("utils/find-calculator-matching-presets", () => {
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
