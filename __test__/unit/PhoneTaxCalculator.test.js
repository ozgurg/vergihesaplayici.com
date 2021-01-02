/* eslint-disable no-undef */

import BaseCalculator from "../../calculators/BaseCalculator";
import PhoneTaxCalculator from "../../calculators/PhoneTaxCalculator";
import { state } from "../../store/exchangeRates";

/**
 * No need to fetch latest exchange rates from the API
 * Expected prices are calculated as if exchange rates were 1
 */
describe("PhoneTaxCalculator", () => {
	it(`Prices: 500, 1500, 5000 / Registration: "${PhoneTaxCalculator.Registration.Import}" / Mode: "${BaseCalculator.CalculationMode.FromSalePrice}"`, () => {
		calculate(
			BaseCalculator.CalculationMode.FromSalePrice,
			PhoneTaxCalculator.Registration.Import,
			[
				{ price: 500, expectedPrice: 305.12 },
				{ price: 1500, expectedPrice: 817.27 },
				{ price: 5000, expectedPrice: 2542.63 }
			]
		);
	});

	it(`Prices: 500, 1500, 5000 / Registration: "${PhoneTaxCalculator.Registration.Import}" / Mode: "${BaseCalculator.CalculationMode.FromBasePrice}"`, () => {
		calculate(
			BaseCalculator.CalculationMode.FromBasePrice,
			PhoneTaxCalculator.Registration.Import,
			[
				{ price: 500, expectedPrice: 819.36 },
				{ price: 1500, expectedPrice: 2949.70 },
				{ price: 5000, expectedPrice: 9832.35 }
			]
		);
	});

	it(`Prices: 500, 1500, 5000 / Registration: "${PhoneTaxCalculator.Registration.Passport}" / Mode: "${BaseCalculator.CalculationMode.FromSalePrice}"`, () => {
		calculate(
			BaseCalculator.CalculationMode.FromSalePrice,
			PhoneTaxCalculator.Registration.Passport,
			[
				{ price: 500, expectedPrice: -1506.20 },
				{ price: 1500, expectedPrice: -506.20 },
				{ price: 5000, expectedPrice: 2993.80 }
			]
		);
	});

	it(`Prices: 500, 1500, 5000 / Registration: "${PhoneTaxCalculator.Registration.Passport}" / Mode: "${BaseCalculator.CalculationMode.FromBasePrice}"`, () => {
		calculate(
			BaseCalculator.CalculationMode.FromBasePrice,
			PhoneTaxCalculator.Registration.Passport,
			[
				{ price: 500, expectedPrice: 2506.20 },
				{ price: 1500, expectedPrice: 3506.20 },
				{ price: 5000, expectedPrice: 7006.20 }
			]
		);
	});
});

/**
 * @param {string} mode
 * @param {string} registration
 * @param {array} prices
 */
function calculate(mode, registration, prices) {
	for (const { price, expectedPrice } of prices) {
		const calculator = new PhoneTaxCalculator(
			state().currencies,
			price,
			mode,
			{
				registration
			}
		).calculate();

		switch (mode) {
			case BaseCalculator.CalculationMode.FromSalePrice:
				expect(calculator.prices.basePrice).toBe(expectedPrice);
				expect(calculator.prices.salePrice).toBe(price);
				break;

			case BaseCalculator.CalculationMode.FromBasePrice:
				expect(calculator.prices.basePrice).toBe(price);
				expect(calculator.prices.salePrice).toBe(expectedPrice);
				break;
		}
	}
}