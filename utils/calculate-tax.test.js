import {
    calculateTaxFromTaxAddedPrice,
    calculateTaxFromTaxFreePrice,
    calculateTotalTaxRate
} from "@/utils/calculate-tax";

describe("utils/calculate-tax", () => {
    describe("calculateTaxFromTaxAddedPrice", () => {
        it("should return correct tax from tax added price", () => {
            expect(calculateTaxFromTaxAddedPrice(500, 25)).toBe(100);
        });
    });

    describe("calculateTaxFromTaxFreePrice", () => {
        it("should return correct tax from tax free price", () => {
            expect(calculateTaxFromTaxFreePrice(500, 18)).toBe(90);
        });
    });

    describe("calculateTotalTaxRate", () => {
        it("should return correct tax rate", () => {
            expect(calculateTotalTaxRate(0, 10)).toBe(0);
            expect(calculateTotalTaxRate(10, 100)).toBe(10);
            expect(calculateTotalTaxRate(500, 1000)).toBe(50);
            expect(calculateTotalTaxRate(50, 50)).toBe(100);
        });
    });
});
