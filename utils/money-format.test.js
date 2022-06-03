/* eslint-disable */
import moneyFormat from "@/utils/money-format";

describe("utils/money-format", () => {
    it("should format 100 TRY correctly", () => {
        expect(moneyFormat(100, "TRY")).toBe("₺100,00");
    });

    it("should format 100.000.026 TRY correctly", () => {
        expect(moneyFormat(100_000_026, "TRY")).toBe("₺100.000.026,00");
    });

    it("should format 100 USD correctly", () => {
        expect(moneyFormat(100, "USD")).toBe("$100,00");
    });

    it("should format 100.000.026 USD correctly", () => {
        expect(moneyFormat(100_000_026, "USD")).toBe("$100.000.026,00");
    });

    it("should format 100 EUR correctly", () => {
        expect(moneyFormat(100, "EUR")).toBe("€100,00");
    });

    it("should format 100.000.026 EUR correctly", () => {
        expect(moneyFormat(100_000_026, "EUR")).toBe("€100.000.026,00");
    });
});
