import Calculator, { Mode } from "./kdv-hesaplayici.calculator.js";

describe("kdv-hesaplayici/Calculator", () => {
    it(`should correctly calculate value added tax if params are: price-rate: [100-%15, 250-%18, 448-%25] / mode: ${Mode.TaxFreePriceToTaxAddedPrice}`, () => {
        calculate({
            mode: Mode.TaxFreePriceToTaxAddedPrice,
            inputs: [
                {
                    price: 100,
                    rate: 15,
                    expected: { taxFree: 100, taxAdded: 115 }
                },
                {
                    price: 250,
                    rate: 18,
                    expected: { taxFree: 250, taxAdded: 295 }
                },
                {
                    price: 448,
                    rate: 25,
                    expected: { taxFree: 448, taxAdded: 560 }
                }
            ]
        });
    });

    it(`should correctly calculate value added tax if params are: price-rate: [100-%15, 250-%18, 448-%25] / mode: ${Mode.TaxAddedPriceToTaxFreePrice}`, () => {
        calculate({
            mode: Mode.TaxAddedPriceToTaxFreePrice,
            inputs: [
                {
                    price: 100,
                    rate: 15,
                    expected: { taxFree: 87, taxAdded: 100 }
                },
                {
                    price: 250,
                    rate: 18,
                    expected: { taxFree: 211.9, taxAdded: 250 }
                },
                {
                    price: 448,
                    rate: 25,
                    expected: { taxFree: 358.4, taxAdded: 448 }
                }
            ]
        });
    });
});

function calculate({ inputs, mode }) {
    for (const { price, rate, expected } of inputs) {
        const calculator = new Calculator({
            price,
            rate,
            mode
        });
        const results = calculator.calculate();

        // We can test other properties for more accuracy,
        // but for now it's enough to test the tax-free and tax-free prices.
        expect(results.prices.taxFree).toBe(expected.taxFree);
        expect(results.prices.taxAdded).toBe(expected.taxAdded);
    }
}
