import { describe, expect, it } from "vitest";
import { Calculator } from "@/domains/vergini-olustur/calculator.js";

describe("domains/vergini-olustur/calculator.js", () => {
    it("calculates results correctly and normalizes them", () => {
        const calculator = new Calculator({
            basePrice: 1_000,
            taxItems: [
                {
                    name: "KDV",
                    rate: 18,
                    rateType: "percent",
                    rateTypeUnitCurrency: "TRY",
                    baseAmountMode: "base-amount"
                },
                {
                    name: "ÖTV",
                    rate: 10,
                    rateType: "percent",
                    rateTypeUnitCurrency: "TRY",
                    baseAmountMode: "previous-amount"
                }
            ],
            exchangeRates: {
                dateUpdated: new Date(),
                rates: {
                    TRY: 1,
                    USD: 1,
                    EUR: 1
                }
            }
        });

        const results = calculator.calculate();

        // Verify the structure is correct
        expect(results).toHaveProperty("taxFees");
        expect(results).toHaveProperty("taxRates");
        expect(results).toHaveProperty("prices");
        expect(results.taxFees).toHaveProperty("total");
        expect(results.taxFees).toHaveProperty("items");
        expect(results.taxRates).toHaveProperty("total");
        expect(results.taxRates).toHaveProperty("items");
        expect(results.prices).toHaveProperty("taxFree");
        expect(results.prices).toHaveProperty("taxAdded");

        // Verify calculations are correct
        expect(results.prices.taxFree).toBe(1_000);
        expect(results.taxFees.items).toHaveLength(2);

        // KDV: 1000 * 0.18 = 180
        expect(results.taxFees.items[0]?.amount).toBe(180);
        expect(results.taxFees.items[0]?.taxItem.name).toBe("KDV");

        // ÖTV: (1000 + 180) * 0.10 = 118
        expect(results.taxFees.items[1]?.amount).toBe(118);
        expect(results.taxFees.items[1]?.taxItem.name).toBe("ÖTV");

        // Total tax: 180 + 118 = 298
        expect(results.taxFees.total).toBe(298);

        // Tax added price: 1000 + 298 = 1298
        expect(results.prices.taxAdded).toBe(1_298);

        // Total tax rate: (298 / 1000) * 100 = 29.8
        expect(results.taxRates.total).toBe(29.8);
    });

    it("handles unit-based tax rates", () => {
        const calculator = new Calculator({
            basePrice: 1_000,
            taxItems: [
                {
                    name: "Unit Tax",
                    rate: 5,
                    rateType: "unit",
                    rateTypeUnitCurrency: "USD",
                    baseAmountMode: "base-amount"
                }
            ],
            exchangeRates: {
                dateUpdated: new Date(),
                rates: {
                    TRY: 1,
                    USD: 30,
                    EUR: 1
                }
            }
        });

        const results = calculator.calculate();

        // Unit tax: 5 * 30 = 150
        expect(results.taxFees.items[0]?.amount).toBe(150);
        expect(results.taxFees.total).toBe(150);
        expect(results.prices.taxAdded).toBe(1_150);
    });
});
