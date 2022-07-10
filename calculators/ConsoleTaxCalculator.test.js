import ConsoleTaxCalculator from "@/calculators/ConsoleTaxCalculator";
import { state } from "@/store/exchange-rates";
import { Mode } from "@/calculators/MultiCurrencyTaxCalculator.js";

describe("calculators/ConsoleTaxCalculator", () => {
    it(`Prices: 300, 400, 500 / Calculation mode: "${Mode.SalePriceToBasePrice}"`, () => {
        calculate(
            Mode.SalePriceToBasePrice,
            [
                { price: 300, expectedPrice: 176.56 },
                { price: 400, expectedPrice: 235.4 },
                { price: 500, expectedPrice: 294.26 }
            ]
        );
    });

    it(`Prices: 300, 400, 500 / Calculation mode: "${Mode.BasePriceToSalePrice}"`, () => {
        calculate(
            Mode.BasePriceToSalePrice,
            [
                { price: 300, expectedPrice: 509.76 },
                { price: 400, expectedPrice: 679.68 },
                { price: 500, expectedPrice: 849.6 }
            ]
        );
    });
});

/**
 * @param {Mode} mode
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
            case Mode.SalePriceToBasePrice:
                expect(results.prices.basePrice).toBe(expectedPrice);
                expect(results.prices.salePrice).toBe(price);
                break;

            case Mode.BasePriceToSalePrice:
                expect(results.prices.basePrice).toBe(price);
                expect(results.prices.salePrice).toBe(expectedPrice);
                break;
        }
    }
}
