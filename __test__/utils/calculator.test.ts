import { describe, expect, it } from "vitest";
import {
    calculateTaxFromTaxAddedPrice,
    calculateTaxFromTaxFreePrice,
    calculateTotalTaxRate,
    normalizeCalculatorResults
} from "@/utils/calculator.js";

describe("utils/calculator.js", () => {
    describe("normalizeCalculatorResults", () => {
        it("normalizes all values in results object", () => {
            const result = normalizeCalculatorResults({
                category1: {
                    item1: 123.456_789,
                    item2: 987.654_321
                },
                category2: {
                    item3: 456.789_123
                }
            });
            expect(result).toEqual({
                category1: {
                    item1: 123.46,
                    item2: 987.65
                },
                category2: {
                    item3: 456.79
                }
            });
        });

        it("handles complex nested structures with arrays and objects", () => {
            const result = normalizeCalculatorResults({
                taxFees: {
                    total: 123.456_789,
                    items: [
                        {
                            taxItem: {
                                name: "Test Tax",
                                rate: 10.123_456,
                                rateType: "percent",
                                rateTypeUnitCurrency: "TRY",
                                baseAmountMode: "base-amount"
                            },
                            amount: 45.678_901
                        }
                    ]
                },
                taxRates: {
                    total: 15.234_567,
                    items: 8.901_234
                },
                prices: {
                    taxFree: 1_000.123_456,
                    taxAdded: 1_123.456_789
                }
            });

            expect(result).toEqual({
                taxFees: {
                    total: 123.46,
                    items: [
                        {
                            taxItem: {
                                name: "Test Tax",
                                rate: 10.12,
                                rateType: "percent",
                                rateTypeUnitCurrency: "TRY",
                                baseAmountMode: "base-amount"
                            },
                            amount: 45.68
                        }
                    ]
                },
                taxRates: {
                    total: 15.23,
                    items: 8.9
                },
                prices: {
                    taxFree: 1_000.12,
                    taxAdded: 1_123.46
                }
            });
        });

        it("handles an empty object", () => {
            const input = {};
            const result = normalizeCalculatorResults(input);
            expect(result).toEqual({});
        });
    });

    describe("calculateTaxFromTaxFreePrice", () => {
        it("calculates tax from tax-free price correctly", () => {
            const taxFreePrice = 1_000;
            const taxRate = 10;
            const expected = 100;

            const result = calculateTaxFromTaxFreePrice(taxFreePrice, taxRate);
            expect(result).toBe(expected);
        });

        it("handles a zero tax rate", () => {
            const taxFreePrice = 1_000;
            const taxRate = 0;
            const expected = 0;

            const result = calculateTaxFromTaxFreePrice(taxFreePrice, taxRate);
            expect(result).toBe(expected);
        });
    });

    describe("calculateTaxFromTaxAddedPrice", () => {
        it("calculates tax from tax-added price correctly", () => {
            const taxAddedPrice = 1_100;
            const taxRate = 10;
            const expected = 100;

            const result = calculateTaxFromTaxAddedPrice(taxAddedPrice, taxRate);
            expect(result).toBe(expected);
        });

        it("handles a zero tax rate", () => {
            const taxAddedPrice = 1_000;
            const taxRate = 0;
            const expected = 0;

            const result = calculateTaxFromTaxAddedPrice(taxAddedPrice, taxRate);
            expect(result).toBe(expected);
        });
    });

    describe("calculateTotalTaxRate", () => {
        it("calculates total tax rate correctly", () => {
            const taxFee = 100;
            const price = 1_000;
            const expected = 10;

            const result = calculateTotalTaxRate(taxFee, price);
            expect(result).toBe(expected);
        });

        it("handles a zero price", () => {
            const taxFee = 100;
            const price = 0;
            const expected = Infinity;

            const result = calculateTotalTaxRate(taxFee, price);
            expect(result).toBe(expected);
        });

        it("handles a zero tax fee", () => {
            const taxFee = 0;
            const price = 1_000;
            const expected = 0;

            const result = calculateTotalTaxRate(taxFee, price);
            expect(result).toBe(expected);
        });
    });
});
