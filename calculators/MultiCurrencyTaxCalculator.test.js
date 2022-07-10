import MultiCurrencyTaxCalculator, { getModeByCurrency, Mode } from "@/calculators/MultiCurrencyTaxCalculator";

describe("calculators/MultiCurrencyTaxCalculator", () => {
    describe("getModeByCurrency", () => {
        it("should return 'SalePriceToBasePrice' if currency is TRY", () => {
            const currency = "TRY";
            expect(getModeByCurrency(currency))
                .toEqual(Mode.SalePriceToBasePrice);
        });

        it("should return 'BasePriceToSalePrice' if currency is USD", () => {
            const currency = "USD";
            expect(getModeByCurrency(currency))
                .toEqual(Mode.BasePriceToSalePrice);
        });
    });

    describe("MultiCurrencyTaxCalculator", () => {
        it("should throw error if methods are not implemented", () => {
            class MockMultiCurrencyTaxCalculator extends MultiCurrencyTaxCalculator {
            }

            const calculator = new MockMultiCurrencyTaxCalculator({
                price: 0,
                exchangeRates: {},
                mode: Mode.BasePriceToSalePrice
            });

            expect(() => calculator.calculateTotalTaxFee()).toThrowError("Not implemented");
            expect(() => calculator.calculateTotalTaxRate()).toThrowError("Not implemented");
            expect(() => calculator.calculate()).toThrowError("Not implemented");
        });
    });
});
