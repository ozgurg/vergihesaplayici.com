// noinspection JSUnresolvedFunction

import MultiCurrencyTaxCalculator from "@/calculators/MultiCurrencyTaxCalculator";

describe("calculators/MultiCurrencyTaxCalculator", () => {
    it("should return 'SalePriceToBasePrice' if currency is TRY", () => {
        const currency = "TRY";
        expect(MultiCurrencyTaxCalculator.getModeByCurrency(currency))
            .toEqual(MultiCurrencyTaxCalculator.Mode.SalePriceToBasePrice);
    });

    it("should return 'BasePriceToSalePrice' if currency is USD", () => {
        const currency = "USD";
        expect(MultiCurrencyTaxCalculator.getModeByCurrency(currency))
            .toEqual(MultiCurrencyTaxCalculator.Mode.BasePriceToSalePrice);
    });

    it("should throw error if methods are not implemented", () => {
        class MockMultiCurrencyTaxCalculator extends MultiCurrencyTaxCalculator {
        }

        const calculator = new MockMultiCurrencyTaxCalculator({
            price: 0,
            exchangeRates: {},
            mode: MultiCurrencyTaxCalculator.Mode.BasePriceToSalePrice
        });

        expect(() => calculator.calculateTotalTaxFee()).toThrowError("Not implemented");
        expect(() => calculator.calculateTotalTaxRate()).toThrowError("Not implemented");
        expect(() => calculator.calculate()).toThrowError("Not implemented");
    });
});
