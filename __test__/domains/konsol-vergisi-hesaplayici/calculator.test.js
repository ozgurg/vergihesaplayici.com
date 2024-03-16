import Calculator from "@/domain/konsol-vergisi-hesaplayici/calculator.js";
import { describe, expect, it } from "vitest";

describe("konsol-vergisi-hesaplayici/Calculator", () => {
    it(`should correctly calculate console tax if params are: price: [300, 400, 500] / calculateFromTaxAddedPrice: ${false}`, () => {
        calculate({
            calculateFromTaxAddedPrice: false,
            prices: [
                {
                    price: 300,
                    expected: {
                        taxFree: 300,
                        taxAdded: 518.4
                    }
                },
                {
                    price: 400,
                    expected: {
                        taxFree: 400,
                        taxAdded: 691.2
                    }
                },
                {
                    price: 500,
                    expected: {
                        taxFree: 500,
                        taxAdded: 864
                    }
                }
            ]
        });
    });

    it(`should correctly calculate console tax if params are: price: [300, 400, 500] / calculateFromTaxAddedPrice: ${true}`, () => {
        calculate({
            calculateFromTaxAddedPrice: true,
            prices: [
                {
                    price: 300,
                    expected: {
                        taxFree: 173.6,
                        taxAdded: 300
                    }
                },
                {
                    price: 400,
                    expected: {
                        taxFree: 231.4,
                        taxAdded: 400
                    }
                },
                {
                    price: 500,
                    expected: {
                        taxFree: 289.3,
                        taxAdded: 500
                    }
                }
            ]
        });
    });
});

function calculate({
    prices,
    calculateFromTaxAddedPrice
}) {
    for (const {
        price,
        expected
    } of prices) {
        const calculator = new Calculator({
            price
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
