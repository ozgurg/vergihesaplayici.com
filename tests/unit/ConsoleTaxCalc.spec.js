import ConsoleTaxCalc from "../../src/calculators/ConsoleTaxCalc";
import TaxCalc from "../../src/calculators/TaxCalc";
/* eslint-disable jest/expect-expect */

// While testing, all currencies is 0
describe("ConsoleTaxCalc", () => {
	it(`Price: 300, 500, 1000 / Mode: "${TaxCalc.MODE_CALCULATE_FROM_SALE_PRICE}"`, () => {
		calculate([
			{
				price: 300,
				expectedPrice: 141.24,
				mode: TaxCalc.MODE_CALCULATE_FROM_SALE_PRICE
			},
			{
				price: 500,
				expectedPrice: 235.4,
				mode: TaxCalc.MODE_CALCULATE_FROM_SALE_PRICE
			},
			{
				price: 1000,
				expectedPrice: 470.81,
				mode: TaxCalc.MODE_CALCULATE_FROM_SALE_PRICE
			}
		]);
	});

	it(`Price: 300, 500, 1000 / Mode: "${TaxCalc.MODE_CALCULATE_FROM_BASE_PRICE}"`, () => {
		calculate([
			{
				price: 300,
				expectedPrice: 637.2,
				mode: TaxCalc.MODE_CALCULATE_FROM_BASE_PRICE
			},
			{
				price: 500,
				expectedPrice: 1062,
				mode: TaxCalc.MODE_CALCULATE_FROM_BASE_PRICE
			},
			{
				price: 1000,
				expectedPrice: 2124,
				mode: TaxCalc.MODE_CALCULATE_FROM_BASE_PRICE
			}
		]);
	});
});

function calculate(scenarios) {
	for (const { price, mode, expectedPrice } of scenarios) {
		const calculator = new ConsoleTaxCalc({
			price,
			mode
		}).calculate();

		switch (mode) {
			case TaxCalc.MODE_CALCULATE_FROM_SALE_PRICE:
				expect(calculator.prices.basePrice).toBe(expectedPrice);
				break;

			case TaxCalc.MODE_CALCULATE_FROM_BASE_PRICE:
				expect(calculator.prices.salePrice).toBe(expectedPrice);
				break;
		}
	}
}