import PhoneTaxCalculator, { getSpecialConsumptionTaxRateByPrice, Registration } from "@/calculators/PhoneTaxCalculator.js";

describe("calculators/PhoneTaxCalculator", () => {
    describe("getSpecialConsumptionTaxRateByPrice", () => {
        it("should return 25 if price is less than or equal to 640", () => {
            expect(getSpecialConsumptionTaxRateByPrice(639)).toBe(25);
            expect(getSpecialConsumptionTaxRateByPrice(640)).toBe(25);
            expect(getSpecialConsumptionTaxRateByPrice(641)).not.toBe(25);
        });

        it("should return 40 if price between 640 and 1500", () => {
            expect(getSpecialConsumptionTaxRateByPrice(640)).not.toBe(40);
            expect(getSpecialConsumptionTaxRateByPrice(641)).toBe(40);
            expect(getSpecialConsumptionTaxRateByPrice(1499)).toBe(40);
            expect(getSpecialConsumptionTaxRateByPrice(1500)).not.toBe(40);
        });

        it("should return 50 if price is greater than or equal to 1500", () => {
            expect(getSpecialConsumptionTaxRateByPrice(1499)).not.toBe(50);
            expect(getSpecialConsumptionTaxRateByPrice(1500)).toBe(50);
            expect(getSpecialConsumptionTaxRateByPrice(1501)).toBe(50);
        });
    });

    describe("PhoneTaxCalculator", () => {
        describe(`Registration: "${Registration.Import}"`, () => {
            it(`should correctly calculate phone tax if params are: price: [500, 1500, 5000] / calculateFromTaxAddedPrice: ${false}`, () => {
                calculate({
                    registration: Registration.Import,
                    calculateFromTaxAddedPrice: false,
                    prices: [
                        {
                            price: 500,
                            expected: { taxFree: 500, taxAdded: 834.26 }
                        },
                        {
                            price: 1500,
                            expected: { taxFree: 1500, taxAdded: 3003.34 }
                        },
                        {
                            price: 5000,
                            expected: { taxFree: 5000, taxAdded: 10011.12 }
                        }
                    ]
                });
            });

            it(`should correctly calculate phone tax if params are: price: [500, 1500, 5000] / calculateFromTaxAddedPrice: ${true}`, () => {
                calculate({
                    registration: Registration.Import,
                    calculateFromTaxAddedPrice: true,
                    prices: [
                        {
                            price: 500,
                            expected: { taxFree: 299.67, taxAdded: 500 }
                        },
                        {
                            price: 1500,
                            expected: { taxFree: 802.68, taxAdded: 1500 }
                        },
                        {
                            price: 5000,
                            expected: { taxFree: 2497.23, taxAdded: 5000 }
                        }
                    ]
                });
            });
        });

        describe(`Registration: "${Registration.Passport}"`, () => {
            it(`should correctly calculate phone tax if params are: price: [500, 1500, 5000] / calculateFromTaxAddedPrice: ${false}`, () => {
                calculate({
                    registration: Registration.Passport,
                    calculateFromTaxAddedPrice: false,
                    prices: [
                        {
                            price: 500,
                            expected: { taxFree: 500, taxAdded: 3252.4 }
                        },
                        {
                            price: 1500,
                            expected: { taxFree: 1500, taxAdded: 4252.4 }
                        },
                        {
                            price: 5000,
                            expected: { taxFree: 5000, taxAdded: 7752.4 }
                        }
                    ]
                });
            });

            it(`should correctly calculate phone tax if params are: price: [500, 1500, 5000] / calculateFromTaxAddedPrice: ${true}`, () => {
                calculate({
                    registration: Registration.Passport,
                    calculateFromTaxAddedPrice: true,
                    prices: [
                        {
                            price: 500,
                            expected: { taxFree: -2252.4, taxAdded: 500 }
                        },
                        {
                            price: 1500,
                            expected: { taxFree: -1252.4, taxAdded: 1500 }
                        },
                        {
                            price: 5000,
                            expected: { taxFree: 2247.6, taxAdded: 5000 }
                        }
                    ]
                });
            });
        });
    });
});

function calculate({ prices, registration, calculateFromTaxAddedPrice }) {
    for (const { price, expected } of prices) {
        const calculator = new PhoneTaxCalculator({
            price,
            registration,
            eurToTryCurrency: 1
        }, {
            calculateFromTaxAddedPrice
        });
        const results = calculator.calculate();

        // We can test other properties for more accuracy,
        // but for now it's enough to test the tax-free and tax-free prices.
        expect(results.prices.taxFree).toBe(expected.taxFree);
        expect(results.prices.taxAdded).toBe(expected.taxAdded);
    }
}
