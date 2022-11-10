import { dateFormat, moneyFormat, normalizePrice, numberFormat } from "@/utils/formatter.js";

describe("utils/formatter", () => {
    describe("normalizePrice", () => {
        it("should return a valid formatted price", () => {
            expect(normalizePrice(1.23)).toEqual(1.2);
            expect(normalizePrice(1.2345)).toEqual(1.2);
            expect(normalizePrice(1.234567)).toEqual(1.2);
            expect(normalizePrice(1.2345678)).toEqual(1.2);
            expect(normalizePrice(1.23456789)).toEqual(1.2);
            expect(normalizePrice(1.234567890)).toEqual(1.2);
        });
    });

    describe("moneyFormat", () => {
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

    describe("numberFormat", () => {
        it("should format 100 correctly", () => {
            expect(numberFormat(100)).toBe("100,00");
        });

        it("should format 100.000.026 correctly", () => {
            expect(numberFormat(100_000_026)).toBe("100.000.026,00");
        });
    });

    describe("dateFormat", () => {
        it("should format date correctly", () => {
            expect(dateFormat(new Date("Fri Nov 11 2022 02:41:24 GMT+0300 (GMT+03:00)"))).toBe("11 Kasım 2022 Cuma 02:41:24");
        });
    });
});
