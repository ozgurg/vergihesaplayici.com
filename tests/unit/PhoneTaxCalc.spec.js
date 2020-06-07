import PhoneTaxCalc from "../../src/calculators/PhoneTaxCalc";
import TaxCalc from "../../src/calculators/TaxCalc";
/* eslint-disable jest/expect-expect */


// While testing, all currencies is 0
describe("PhoneTaxCalc", () => {
	it(`Mode: "${TaxCalc.MODE_CALCULATE_FROM_SALE_PRICE}" / Registration: "${TaxCalc.REGISTRATION_IMPORT}"`, () => {
		calculate([
			{
				price: 500,
				expectedPrice: 305.12,
				mode: TaxCalc.MODE_CALCULATE_FROM_SALE_PRICE,
				registration: PhoneTaxCalc.REGISTRATION_IMPORT
			},
			{
				price: 1500,
				expectedPrice: 817.27,
				mode: TaxCalc.MODE_CALCULATE_FROM_SALE_PRICE,
				registration: PhoneTaxCalc.REGISTRATION_IMPORT
			},
			{
				price: 5000,
				expectedPrice: 2542.63,
				mode: TaxCalc.MODE_CALCULATE_FROM_SALE_PRICE,
				registration: PhoneTaxCalc.REGISTRATION_IMPORT
			}
		]);
	});

	it(`Mode: "${TaxCalc.MODE_CALCULATE_FROM_BASE_PRICE}" / Registration: "${PhoneTaxCalc.REGISTRATION_IMPORT}"`, () => {
		calculate([
			{
				price: 500,
				expectedPrice: 818.63,
				mode: TaxCalc.MODE_CALCULATE_FROM_BASE_PRICE,
				registration: PhoneTaxCalc.REGISTRATION_IMPORT
			},
			{
				price: 1500,
				expectedPrice: 2947.05,
				mode: TaxCalc.MODE_CALCULATE_FROM_BASE_PRICE,
				registration: PhoneTaxCalc.REGISTRATION_IMPORT
			},
			{
				price: 5000,
				expectedPrice: 9823.5,
				mode: TaxCalc.MODE_CALCULATE_FROM_BASE_PRICE,
				registration: PhoneTaxCalc.REGISTRATION_IMPORT
			}
		]);
	});

	it(`Mode: "${TaxCalc.MODE_CALCULATE_FROM_SALE_PRICE}" / Registration: "${PhoneTaxCalc.REGISTRATION_PASSPORT}"`, () => {
		calculate([
			{
				price: 500,
				expectedPrice: -1338,
				mode: TaxCalc.MODE_CALCULATE_FROM_SALE_PRICE,
				registration: PhoneTaxCalc.REGISTRATION_PASSPORT
			},
			{
				price: 1500,
				expectedPrice: -338,
				mode: TaxCalc.MODE_CALCULATE_FROM_SALE_PRICE,
				registration: PhoneTaxCalc.REGISTRATION_PASSPORT
			},
			{
				price: 5000,
				expectedPrice: 3162,
				mode: TaxCalc.MODE_CALCULATE_FROM_SALE_PRICE,
				registration: PhoneTaxCalc.REGISTRATION_PASSPORT
			}
		]);
	});

	it(`Mode: "${TaxCalc.MODE_CALCULATE_FROM_BASE_PRICE}" / Registration: "${PhoneTaxCalc.REGISTRATION_PASSPORT}"`, () => {
		calculate([
			{
				price: 500,
				expectedPrice: 2338,
				mode: TaxCalc.MODE_CALCULATE_FROM_BASE_PRICE,
				registration: PhoneTaxCalc.REGISTRATION_PASSPORT
			},
			{
				price: 1500,
				expectedPrice: 3338,
				mode: TaxCalc.MODE_CALCULATE_FROM_BASE_PRICE,
				registration: PhoneTaxCalc.REGISTRATION_PASSPORT
			},
			{
				price: 5000,
				expectedPrice: 6838,
				mode: TaxCalc.MODE_CALCULATE_FROM_BASE_PRICE,
				registration: PhoneTaxCalc.REGISTRATION_PASSPORT
			}
		]);
	});
});

function calculate(scenarios) {
	for (const { price, mode, registration, expectedPrice } of scenarios) {
		const calculator = new PhoneTaxCalc({
			price,
			mode,
			opts: {
				registration: registration
			}
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