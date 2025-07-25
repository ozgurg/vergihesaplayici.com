import { beforeEach, describe, expect, it, vi } from "vitest";
import {
    _UNIT_TEST_ONLY_clearDateFormatterCache,
    _UNIT_TEST_ONLY_clearMoneyFormattersCache,
    _UNIT_TEST_ONLY_clearNumberFormatterCache,
    formatDate,
    formatMoney,
    formatNumber
} from "@/utils/formatter.js";

describe("utils/formatter.js", () => {
    describe("formatMoney", () => {
        beforeEach(() => {
            _UNIT_TEST_ONLY_clearMoneyFormattersCache();
        });

        it("formats price correctly", () => {
            const result = formatMoney(1_234.56, "TRY");
            expect(result).toBe("₺1.234,56");
        });

        it("formats price with at least two decimal places", () => {
            const result = formatMoney(10, "TRY");
            expect(result).toBe("₺10,00");
        });

        it("handles negative values correctly", () => {
            const result = formatMoney(-123.45, "TRY");
            expect(result).toBe("-₺123,45");
        });

        it("caches `Intl.NumberFormat` for a currency", () => {
            const numberFormatSpy = vi.spyOn(Intl, "NumberFormat");

            formatMoney(100, "USD");
            expect(numberFormatSpy).toHaveBeenCalledTimes(1);

            formatMoney(100, "USD");
            expect(numberFormatSpy).toHaveBeenCalledTimes(1); // Still 1, no new formatter created
        });

        it("creates different `Intl.NumberFormat`s for different currencies", () => {
            const numberFormatSpy = vi.spyOn(Intl, "NumberFormat");

            formatMoney(100, "USD");
            expect(numberFormatSpy).toHaveBeenCalledTimes(1);

            // Different currency should create a new formatter
            formatMoney(100, "TRY");
            expect(numberFormatSpy).toHaveBeenCalledTimes(2);

            // Using the first currency again shouldn't create a new formatter
            formatMoney(100, "USD");
            expect(numberFormatSpy).toHaveBeenCalledTimes(2); // Still 2, no new formatter created
        });

        it("formats money correctly with cached `Intl.NumberFormat`", () => {
            const result1 = formatMoney(1_234.56, "USD");
            const result2 = formatMoney(1_234.56, "USD");
            expect(result1).toBe(result2);
        });
    });

    describe("formatNumber", () => {
        beforeEach(() => {
            _UNIT_TEST_ONLY_clearNumberFormatterCache();
        });

        it("formats number correctly", () => {
            const result = formatNumber(1_234.56);
            expect(result).toBe("1.234,56");
        });

        it("formats price with at least two decimal places", () => {
            const result = formatNumber(10);
            expect(result).toBe("10,00");
        });

        it("handles negative values correctly", () => {
            const result = formatNumber(-123.45);
            expect(result).toBe("-123,45");
        });

        it("caches `Intl.NumberFormat`", () => {
            const numberFormatSpy = vi.spyOn(Intl, "NumberFormat");

            formatNumber(100);
            expect(numberFormatSpy).toHaveBeenCalledTimes(1);

            formatNumber(100);
            expect(numberFormatSpy).toHaveBeenCalledTimes(1); // Still 1, no new formatter created
        });

        it("formats number correctly with cached `Intl.NumberFormat`", () => {
            const result1 = formatNumber(1_234.56);
            const result2 = formatNumber(1_234.56);
            expect(result1).toBe(result2);
        });
    });

    describe("formatDate", () => {
        const TEST_DATE = new Date("Sat Jan 01 2025 01:02:03 GMT+0300 (GMT+03:00)");

        beforeEach(() => {
            _UNIT_TEST_ONLY_clearDateFormatterCache();
        });

        it("formats date correctly", () => {
            const result = formatDate(TEST_DATE);
            expect(result).toBe("1 Ocak 2025 Çarşamba 01:02:03");
        });

        it("caches `Intl.DateTimeFormat`", () => {
            const dateTimeFormatSpy = vi.spyOn(Intl, "DateTimeFormat");

            formatDate(TEST_DATE);
            expect(dateTimeFormatSpy).toHaveBeenCalledTimes(1);

            formatDate(TEST_DATE);
            expect(dateTimeFormatSpy).toHaveBeenCalledTimes(1); // Still 1, no new formatter created
        });

        it("formats date correctly with cached `Intl.DateTimeFormat`", () => {
            const result1 = formatDate(TEST_DATE);
            const result2 = formatDate(TEST_DATE);
            expect(result1).toBe(result2);
        });
    });
});
