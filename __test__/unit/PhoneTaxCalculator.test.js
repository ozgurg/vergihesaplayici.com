import PhoneTaxCalculator from "@/calculators/PhoneTaxCalculator";
import { state } from "@/store/exchange-rates";

describe("PhoneTaxCalculator", () => {
    it(`Prices: 500, 1500, 5000 / Calculation mode: "${PhoneTaxCalculator.CalculationMode.FromSalePrice}" / Registration: "${PhoneTaxCalculator.Registration.Import}"`, () => {
        calculate(
            PhoneTaxCalculator.CalculationMode.FromSalePrice,
            [
                { price: 500, expectedPrice: 305.11 },
                { price: 1500, expectedPrice: 817.28 },
                { price: 5000, expectedPrice: 2542.62 }
            ],
            PhoneTaxCalculator.Registration.Import
        );
    });

    it(`Prices: 500, 1500, 5000 / Calculation mode: "${PhoneTaxCalculator.CalculationMode.FromBasePrice}" / Registration: "${PhoneTaxCalculator.Registration.Import}"`, () => {
        calculate(
            PhoneTaxCalculator.CalculationMode.FromBasePrice,
            [
                { price: 500, expectedPrice: 819.37 },
                { price: 1500, expectedPrice: 2949.70 },
                { price: 5000, expectedPrice: 9832.35 }
            ],
            PhoneTaxCalculator.Registration.Import
        );
    });

    it(`Prices: 500, 1500, 5000 / Calculation mode: "${PhoneTaxCalculator.CalculationMode.FromSalePrice}" / Registration: "${PhoneTaxCalculator.Registration.Passport}"`, () => {
        calculate(
            PhoneTaxCalculator.CalculationMode.FromSalePrice,
            [
                { price: 500, expectedPrice: -1506.20 },
                { price: 1500, expectedPrice: -506.20 },
                { price: 5000, expectedPrice: 2993.80 }
            ],
            PhoneTaxCalculator.Registration.Passport
        );
    });

    it(`Prices: 500, 1500, 5000 / Calculation mode: "${PhoneTaxCalculator.CalculationMode.FromBasePrice}" / Registration: "${PhoneTaxCalculator.Registration.Passport}"`, () => {
        calculate(
            PhoneTaxCalculator.CalculationMode.FromBasePrice,
            [
                { price: 500, expectedPrice: 2506.20 },
                { price: 1500, expectedPrice: 3506.20 },
                { price: 5000, expectedPrice: 7006.20 }
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
            case PhoneTaxCalculator.CalculationMode.FromSalePrice:
                expect(results.prices.basePrice).toBe(expectedPrice);
                expect(results.prices.salePrice).toBe(price);
                break;

            case PhoneTaxCalculator.CalculationMode.FromBasePrice:
                expect(results.prices.basePrice).toBe(price);
                expect(results.prices.salePrice).toBe(expectedPrice);
                break;
        }
    }
}
