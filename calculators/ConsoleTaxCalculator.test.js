import ConsoleTaxCalculator from "@/calculators/ConsoleTaxCalculator.js";

describe("calculators/ConsoleTaxCalculator", () => {
    it(`should correctly calculate console tax if params are: price: [300, 400, 500] / calculateFromTaxAddedPrice: ${false}`, () => {
        calculate({
            calculateFromTaxAddedPrice: false,
            prices: [
                {
                    price: 300,
                    expected: { taxFree: 300, taxAdded: 509.76 }
                },
                {
                    price: 400,
                    expected: { taxFree: 400, taxAdded: 679.68 }
                },
                {
                    price: 500,
                    expected: { taxFree: 500, taxAdded: 849.6 }
                }
            ]
        });
    });

    it(`should correctly calculate console tax if params are: price: [300, 400, 500] / calculateFromTaxAddedPrice: ${true}`, () => {
        calculate({
            calculateFromTaxAddedPrice: true,
            prices: [
                {
                    price: 300,
                    expected: { taxFree: 176.55, taxAdded: 300 }
                },
                {
                    price: 400,
                    expected: { taxFree: 235.41, taxAdded: 400 }
                },
                {
                    price: 500,
                    expected: { taxFree: 294.25, taxAdded: 500 }
                }
            ]
        });
    });
});

function calculate({ prices, calculateFromTaxAddedPrice }) {
    for (const { price, expected } of prices) {
        const calculator = new ConsoleTaxCalculator({
            price
        }, {
            calculateFromTaxAddedPrice
        });
        const results = calculator.calculate();

        // We can test other properties for more accuracy,
        // but for now it's enough to test the tax-free and tax-free prices.
        expect(results.prices.taxFree).toBe(expected.taxFree);
        expect(results.prices.taxAdded).toBe(expected.taxAdded);
    }
}
