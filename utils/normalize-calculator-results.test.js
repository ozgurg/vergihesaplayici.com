import { normalizeCalculatorResults } from "@/utils/normalize-calculator-results.js";

describe("utils/normalize-calculator-results", () => {
    it("should normalize calculator results", () => {
        const results = {
            taxFees: {
                fee1: 1.00000,
                fee2: 2.000
            },
            taxRates: {
                rate1: 99.999
            }
        };
        const expectedResults = {
            taxFees: {
                fee1: 1.00,
                fee2: 2.00
            },
            taxRates: {
                rate1: 100
            }
        };
        expect(normalizeCalculatorResults(results)).toStrictEqual(expectedResults);
    });

    it("should not normalize 'null' values", () => {
        const results = {
            taxFees: {
                fee1: 1.10000000,
                fee2: null
            },
            taxRates: {
                rate1: null
            }
        };
        const expectedResults = {
            taxFees: {
                fee1: 1.10,
                fee2: null
            },
            taxRates: {
                rate1: null
            }
        };
        expect(normalizeCalculatorResults(results)).toStrictEqual(expectedResults);
    });
});
