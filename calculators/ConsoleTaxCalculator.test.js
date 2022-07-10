import ConsoleTaxCalculator from "@/calculators/ConsoleTaxCalculator";
import { state } from "@/store/exchange-rates";

describe("calculators/ConsoleTaxCalculator", () => {
    it(`Prices: 300, 400, 500 / Calculation mode: "${ConsoleTaxCalculator.Mode.SalePriceToBasePrice}"`, () => {
        calculate(
            ConsoleTaxCalculator.Mode.SalePriceToBasePrice,
            [
                { price: 300, expectedPrice: 176.56 },
                { price: 400, expectedPrice: 235.4 },
                { price: 500, expectedPrice: 294.26 }
            ]
        );
    });

    it(`Prices: 300, 400, 500 / Calculation mode: "${ConsoleTaxCalculator.Mode.BasePriceToSalePrice}"`, () => {
        calculate(
            ConsoleTaxCalculator.Mode.BasePriceToSalePrice,
            [
                { price: 300, expectedPrice: 509.76 },
                { price: 400, expectedPrice: 679.68 },
                { price: 500, expectedPrice: 849.6 }
            ]
        );
    });
});

/**
 * @param {ConsoleTaxCalculator.Mode} mode
 * @param {array} prices
 */
function calculate(mode, prices) {
    for (const { price, expectedPrice } of prices) {
        const consoleTaxCalculator = new ConsoleTaxCalculator({
            price,
            exchangeRates: state().currencies,
            mode
        });
        const results = consoleTaxCalculator.calculate().results();

        switch (mode) {
            case ConsoleTaxCalculator.Mode.SalePriceToBasePrice:
                expect(results.prices.basePrice).toBe(expectedPrice);
                expect(results.prices.salePrice).toBe(price);
                break;

            case ConsoleTaxCalculator.Mode.BasePriceToSalePrice:
                expect(results.prices.basePrice).toBe(price);
                expect(results.prices.salePrice).toBe(expectedPrice);
                break;
        }
    }
}
