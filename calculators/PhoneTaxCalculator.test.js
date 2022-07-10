import PhoneTaxCalculator, { getSctRateByPrice } from "@/calculators/PhoneTaxCalculator";
import { state } from "@/store/exchange-rates";
import { Mode } from "~/calculators/MultiCurrencyTaxCalculator.js";

describe("calculators/PhoneTaxCalculator", () => {
    describe("getSctRateByPrice", () => {
        it("should return 25 if price is less than or equal to 640", () => {
            expect(getSctRateByPrice(639)).toBe(25);
            expect(getSctRateByPrice(640)).toBe(25);
            expect(getSctRateByPrice(641)).not.toBe(25);
        });

        it("should return 40 if price between 640 and 1500", () => {
            expect(getSctRateByPrice(640)).not.toBe(40);
            expect(getSctRateByPrice(641)).toBe(40);
            expect(getSctRateByPrice(1499)).toBe(40);
            expect(getSctRateByPrice(1500)).not.toBe(40);
        });

        it("should return 50 if price is greater than or equal to 1500", () => {
            expect(getSctRateByPrice(1499)).not.toBe(50);
            expect(getSctRateByPrice(1500)).toBe(50);
            expect(getSctRateByPrice(1501)).toBe(50);
        });
    });

    describe("PhoneTaxCalculator", () => {
        it(`Prices: 500, 1500, 5000 / Calculation mode: "${Mode.SalePriceToBasePrice}" / Registration: "${PhoneTaxCalculator.Registration.Import}"`, () => {
            calculate(
                Mode.SalePriceToBasePrice,
                [
                    { price: 500, expectedPrice: 299.66 },
                    { price: 1500, expectedPrice: 802.68 },
                    { price: 5000, expectedPrice: 2497.23 }
                ],
                PhoneTaxCalculator.Registration.Import
            );
        });

        it(`Prices: 500, 1500, 5000 / Calculation mode: "${Mode.BasePriceToSalePrice}" / Registration: "${PhoneTaxCalculator.Registration.Import}"`, () => {
            calculate(
                Mode.BasePriceToSalePrice,
                [
                    { price: 500, expectedPrice: 834.26 },
                    { price: 1500, expectedPrice: 3003.34 },
                    { price: 5000, expectedPrice: 10011.12 }
                ],
                PhoneTaxCalculator.Registration.Import
            );
        });

        it(`Prices: 500, 1500, 5000 / Calculation mode: "${Mode.SalePriceToBasePrice}" / Registration: "${PhoneTaxCalculator.Registration.Passport}"`, () => {
            calculate(
                Mode.SalePriceToBasePrice,
                [
                    { price: 500, expectedPrice: -2232.4 },
                    { price: 1500, expectedPrice: -1232.4 },
                    { price: 5000, expectedPrice: 2267.6 }
                ],
                PhoneTaxCalculator.Registration.Passport
            );
        });

        it(`Prices: 500, 1500, 5000 / Calculation mode: "${Mode.BasePriceToSalePrice}" / Registration: "${PhoneTaxCalculator.Registration.Passport}"`, () => {
            calculate(
                Mode.BasePriceToSalePrice,
                [
                    { price: 500, expectedPrice: 3232.4 },
                    { price: 1500, expectedPrice: 4232.4 },
                    { price: 5000, expectedPrice: 7732.4 }
                ],
                PhoneTaxCalculator.Registration.Passport
            );
        });
    });
});

/**
 * @param {Mode} mode
 * @param {array} prices
 * @param {PhoneTaxCalculator.Registration} registration
 */
function calculate(mode, prices, registration) {
    for (const { price, expectedPrice } of prices) {
        const phoneTaxCalculator = new PhoneTaxCalculator({
            price,
            exchangeRates: state().currencies,
            mode
        }, { registration });
        const results = phoneTaxCalculator.calculate().results();

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
