import isCurrencyAvailable from "@/utils/is-currency-available";

describe("utils/is-currency-available", () => {
    const availableCurrencies = ["TRY", "USD", "EUR"];

    it("should return true if currency is available", () => {
        expect(isCurrencyAvailable("TRY", availableCurrencies)).toBe(true);
    });

    it("should return false if currency is not available", () => {
        expect(isCurrencyAvailable("RUB", availableCurrencies)).toBe(false);
    });
});
