import MultiCurrencyTaxCalculator from "@/calculators/BaseMultiCurrencyTaxCalculator";

describe("calculators/MultiCurrencyTaxCalculator", () => {
    it("should return 'SalePriceToBasePrice' if currency is TRY", () => {
        const currency = "TRY";
        expect(MultiCurrencyTaxCalculator.getCalculationModeByCurrency(currency))
            .toEqual(MultiCurrencyTaxCalculator.CalculationMode.SalePriceToBasePrice);
    });

    it("should return 'BasePriceToSalePrice' if currency is USD", () => {
        const currency = "USD";
        expect(MultiCurrencyTaxCalculator.getCalculationModeByCurrency(currency))
            .toEqual(MultiCurrencyTaxCalculator.CalculationMode.BasePriceToSalePrice);
    });

    it("should throw error if methods are not implemented", () => {
        class MockMultiCurrencyTaxCalculator extends MultiCurrencyTaxCalculator {
        }

        const calculator = new MockMultiCurrencyTaxCalculator({
            price: 0,
            exchangeRates: {},
            calculationMode: MultiCurrencyTaxCalculator.CalculationMode.BasePriceToSalePrice
        });

        expect(() => calculator.calculateTotalTaxFee()).toThrowError("Not implemented");
        expect(() => calculator.calculateTotalTaxRate()).toThrowError("Not implemented");
        expect(() => calculator.calculate()).toThrowError("Not implemented");
    });
});
