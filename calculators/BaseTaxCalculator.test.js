import BaseTaxCalculator from "@/calculators/BaseTaxCalculator";

describe("BaseTaxCalculator", () => {
    // Normally, BaseTaxCalculator is an abstract class
    const baseTaxCalculator = new BaseTaxCalculator();

    it("should calculate tax (price) from tax free price", () => {
        expect(baseTaxCalculator.calculateTaxFromTaxFreePrice(500, 18)).toBe(90);
    });

    it("should calculate tax (price) from tax added price", () => {
        expect(baseTaxCalculator.calculateTaxFromTaxAddedPrice(500, 25)).toBe(100);
    });
});
