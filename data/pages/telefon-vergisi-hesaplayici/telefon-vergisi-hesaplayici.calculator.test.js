import Calculator, { getSpecialConsumptionTaxRateByPrice, Registration } from "@/data/pages/telefon-vergisi-hesaplayici/telefon-vergisi-hesaplayici.calculator.js";

describe("telefon-vergisi-hesaplayici/Calculator", () => {
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
                            expected: { taxFree: 500, taxAdded: 834.3 }
                        },
                        {
                            price: 1500,
                            expected: { taxFree: 1500, taxAdded: 3003.3 }
                        },
                        {
                            price: 5000,
                            expected: { taxFree: 5000, taxAdded: 10011.1 }
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
                            expected: { taxFree: 299.7, taxAdded: 500 }
                        },
                        {
                            price: 1500,
                            expected: { taxFree: 802.6, taxAdded: 1500 }
                        },
                        {
                            price: 5000,
                            expected: { taxFree: 2497.2, taxAdded: 5000 }
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
                            expected: { taxFree: 500, taxAdded: 6611.3 }
                        },
                        {
                            price: 1500,
                            expected: { taxFree: 1500, taxAdded: 7611.3 }
                        },
                        {
                            price: 5000,
                            expected: { taxFree: 5000, taxAdded: 11111.3 }
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
                            expected: { taxFree: -5611.3, taxAdded: 500 }
                        },
                        {
                            price: 1500,
                            expected: { taxFree: -4611.3, taxAdded: 1500 }
                        },
                        {
                            price: 5000,
                            expected: { taxFree: -1111.3, taxAdded: 5000 }
                        }
                    ]
                });
            });
        });
    });
});

function calculate({ prices, registration, calculateFromTaxAddedPrice }) {
    for (const { price, expected } of prices) {
        const calculator = new Calculator({
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
