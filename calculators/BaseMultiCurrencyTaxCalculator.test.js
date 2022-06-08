import BaseMultiCurrencyTaxCalculator from "@/calculators/BaseMultiCurrencyTaxCalculator";

describe("calculators/BaseMultiCurrencyTaxCalculator", () => {
    it("should return 'SalePriceToBasePrice' if currency is TRY", () => {
        const currency = "TRY";
        expect(BaseMultiCurrencyTaxCalculator.getCalculationModeByCurrency(currency))
            .toEqual(BaseMultiCurrencyTaxCalculator.CalculationMode.SalePriceToBasePrice);
    });

    it("should return 'BasePriceToSalePrice' if currency is USD", () => {
        const currency = "USD";
        expect(BaseMultiCurrencyTaxCalculator.getCalculationModeByCurrency(currency))
            .toEqual(BaseMultiCurrencyTaxCalculator.CalculationMode.BasePriceToSalePrice);
    });
});
