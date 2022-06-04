import BaseMultiCurrencyTaxCalculator from "@/calculators/BaseMultiCurrencyTaxCalculator";

describe("calculators/BaseMultiCurrencyTaxCalculator", () => {
    it("should return 'FromSalePrice' if currency is TRY", () => {
        const currency = "TRY";
        expect(BaseMultiCurrencyTaxCalculator.getCalculationModeByCurrency(currency))
            .toEqual(BaseMultiCurrencyTaxCalculator.CalculationMode.FromSalePrice);
    });

    it("should return 'FromBasePrice' if currency is USD", () => {
        const currency = "USD";
        expect(BaseMultiCurrencyTaxCalculator.getCalculationModeByCurrency(currency))
            .toEqual(BaseMultiCurrencyTaxCalculator.CalculationMode.FromBasePrice);
    });
});
