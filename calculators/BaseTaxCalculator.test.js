import BaseTaxCalculator from "@/calculators/BaseTaxCalculator";

describe("calculators/BaseTaxCalculator", () => {
    it("should return correct tax from tax free price", () => {
        expect(BaseTaxCalculator.calculateTaxFromTaxFreePrice(500, 18)).toBe(90);
    });

    it("should return correct tax from tax added price", () => {
        expect(BaseTaxCalculator.calculateTaxFromTaxAddedPrice(500, 25)).toBe(100);
    });
});
