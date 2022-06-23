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

    it("should throw error if methods are not implemented", () => {
        class MockMultiCurrencyTaxCalculator extends BaseMultiCurrencyTaxCalculator {
        }

        const calculator = new MockMultiCurrencyTaxCalculator({
            price: 0,
            exchangeRates: {},
            calculationMode: BaseMultiCurrencyTaxCalculator.CalculationMode.BasePriceToSalePrice
        });

        expect(() => calculator.calculateTotalTaxFee()).toThrowError("Not implemented");
        expect(() => calculator.calculateTotalTaxRate()).toThrowError("Not implemented");
        expect(() => calculator.calculate()).toThrowError("Not implemented");
    });
});
