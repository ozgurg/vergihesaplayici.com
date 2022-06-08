import { calculateTaxFromTaxAddedPrice, calculateTaxFromTaxFreePrice } from "@/utils/calculate-tax";

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
});
