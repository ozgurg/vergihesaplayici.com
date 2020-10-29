/* eslint-disable no-undef */

import BaseCalculator from "../../calculators/BaseCalculator";
import ConsoleTaxCalculator from "../../calculators/ConsoleTaxCalculator";
import { state } from "../../store/exchangeRates";

/**
 * No need to fetch latest exchange rates from the API
 * Expected prices are calculated as if exchange rates were 1
 */
describe("ConsoleTaxCalculator", () => {
	it(`Prices: 300, 400, 500 / Reduced custom rate: "false" / Mode: "${BaseCalculator.CalculationMode.FromSalePrice}"`, () => {
		calculate(
			BaseCalculator.CalculationMode.FromSalePrice,
			false,
			[
				{ price: 300, expectedPrice: 141.24 },
				{ price: 400, expectedPrice: 188.32 },
				{ price: 500, expectedPrice: 235.40 }
			]
		);
	});

	it(`Prices: 300, 400, 500 / Reduced custom rate: "false" / Mode: "${BaseCalculator.CalculationMode.FromBasePrice}"`, () => {
		calculate(
			BaseCalculator.CalculationMode.FromBasePrice,
			false,
			[
				{ price: 300, expectedPrice: 637.20 },
				{ price: 400, expectedPrice: 849.60 },
				{ price: 500, expectedPrice: 1062 }
			]
		);
	});

	it(`Prices: 300, 400, 500 / Reduced custom rate: "true" / Mode: "${BaseCalculator.CalculationMode.FromSalePrice}"`, () => {
		calculate(
			BaseCalculator.CalculationMode.FromSalePrice,
			true,
			[
				{ price: 300, expectedPrice: 176.55 },
				{ price: 400, expectedPrice: 235.40 },
				{ price: 500, expectedPrice: 294.26 }
			]
		);
	});

	it(`Prices: 300, 400, 500 / Reduced custom rate: "true" / Mode: "${BaseCalculator.CalculationMode.FromBasePrice}"`, () => {
		calculate(
			BaseCalculator.CalculationMode.FromBasePrice,
			true,
			[
				{ price: 300, expectedPrice: 509.76 },
				{ price: 400, expectedPrice: 679.68 },
				{ price: 500, expectedPrice: 849.60 }
			]
		);
	});
});

/**
 * @param {string} mode
 * @param {boolean} reducedCustomRate
 * @param {array} prices
 */
function calculate(mode, reducedCustomRate, prices) {
	for (const { price, expectedPrice } of prices) {
		const calculator = new ConsoleTaxCalculator(
			state().currencies,
			price,
			mode,
			{
				reducedCustomRate
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