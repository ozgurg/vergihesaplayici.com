import PhoneTaxCalculator from "@/calculators/PhoneTaxCalculator";
import { state } from "@/store/exchange-rates";

describe("calculators/PhoneTaxCalculator", () => {
    it(`Prices: 500, 1500, 5000 / Calculation mode: "${PhoneTaxCalculator.CalculationMode.SalePriceToBasePrice}" / Registration: "${PhoneTaxCalculator.Registration.Import}"`, () => {
        calculate(
            PhoneTaxCalculator.CalculationMode.SalePriceToBasePrice,
            [
                { price: 500, expectedPrice: 299.66 },
                { price: 1500, expectedPrice: 802.68 },
                { price: 5000, expectedPrice: 2497.23 }
            ],
            PhoneTaxCalculator.Registration.Import
        );
    });

    it(`Prices: 500, 1500, 5000 / Calculation mode: "${PhoneTaxCalculator.CalculationMode.BasePriceToSalePrice}" / Registration: "${PhoneTaxCalculator.Registration.Import}"`, () => {
        calculate(
            PhoneTaxCalculator.CalculationMode.BasePriceToSalePrice,
            [
                { price: 500, expectedPrice: 834.26 },
                { price: 1500, expectedPrice: 3003.34 },
                { price: 5000, expectedPrice: 10011.12 }
            ],
            PhoneTaxCalculator.Registration.Import
        );
    });

    it(`Prices: 500, 1500, 5000 / Calculation mode: "${PhoneTaxCalculator.CalculationMode.SalePriceToBasePrice}" / Registration: "${PhoneTaxCalculator.Registration.Passport}"`, () => {
        calculate(
            PhoneTaxCalculator.CalculationMode.SalePriceToBasePrice,
            [
                { price: 500, expectedPrice: -2232.4 },
                { price: 1500, expectedPrice: -1232.4 },
                { price: 5000, expectedPrice: 2267.6 }
            ],
            PhoneTaxCalculator.Registration.Passport
        );
    });

    it(`Prices: 500, 1500, 5000 / Calculation mode: "${PhoneTaxCalculator.CalculationMode.BasePriceToSalePrice}" / Registration: "${PhoneTaxCalculator.Registration.Passport}"`, () => {
        calculate(
            PhoneTaxCalculator.CalculationMode.BasePriceToSalePrice,
            [
                { price: 500, expectedPrice: 3232.4 },
                { price: 1500, expectedPrice: 4232.4 },
                { price: 5000, expectedPrice: 7732.4 }
            ],
            PhoneTaxCalculator.Registration.Passport
        );
    });
});

/**
 * @param {PhoneTaxCalculator.CalculationMode} calculationMode
 * @param {array} prices
 * @param {PhoneTaxCalculator.Registration} registration
 */
function calculate(calculationMode, prices, registration) {
    for (const { price, expectedPrice } of prices) {
        const phoneTaxCalculator = new PhoneTaxCalculator({
            price,
            exchangeRates: state().currencies,
            calculationMode
        }, { registration });
        const results = phoneTaxCalculator.calculate().results();

        switch (calculationMode) {
            case PhoneTaxCalculator.CalculationMode.SalePriceToBasePrice:
                expect(results.prices.basePrice).toBe(expectedPrice);
                expect(results.prices.salePrice).toBe(price);
                break;

            case PhoneTaxCalculator.CalculationMode.BasePriceToSalePrice:
                expect(results.prices.basePrice).toBe(price);
                expect(results.prices.salePrice).toBe(expectedPrice);
                break;
        }
    }
}
