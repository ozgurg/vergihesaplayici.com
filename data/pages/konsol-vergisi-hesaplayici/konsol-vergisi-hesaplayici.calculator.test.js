import Calculator from "@/data/pages/konsol-vergisi-hesaplayici/konsol-vergisi-hesaplayici.calculator.js";

describe("konsol-vergisi-hesaplayici/Calculator", () => {
    it(`should correctly calculate console tax if params are: price: [300, 400, 500] / calculateFromTaxAddedPrice: ${false}`, () => {
        calculate({
            calculateFromTaxAddedPrice: false,
            prices: [
                {
                    price: 300,
                    expected: { taxFree: 300, taxAdded: 509.8 }
                },
                {
                    price: 400,
                    expected: { taxFree: 400, taxAdded: 679.7 }
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
                    expected: { taxFree: 176.5, taxAdded: 300 }
                },
                {
                    price: 400,
                    expected: { taxFree: 235.3, taxAdded: 400 }
                },
                {
                    price: 500,
                    expected: { taxFree: 294.2, taxAdded: 500 }
                }
            ]
        });
    });
});

function calculate({ prices, calculateFromTaxAddedPrice }) {
    for (const { price, expected } of prices) {
        const calculator = new Calculator({
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
