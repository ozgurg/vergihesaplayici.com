import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { API_PROVIDER_CREDIT, getExchangeRates, initializeExchangeRates } from "@/utils/exchange-rates.js";

const mockFetch = vi.fn();
window.fetch = mockFetch;

describe("utils/exchange-rates.js", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    describe("API_PROVIDER_CREDIT", () => {
        it("provides API provider credit", () => {
            expect(API_PROVIDER_CREDIT.url).toBeInstanceOf(URL);
            expect(API_PROVIDER_CREDIT.url).toBeDefined();
            expect(API_PROVIDER_CREDIT.title).toBeDefined();
        });
    });

    describe("initializeExchangeRates", () => {
        it("should fetch and return exchange rates successfully", async () => {
            const testDate = "2025-01-02T01:02:03Z";

            mockFetch.mockResolvedValueOnce({
                ok: true,
                json: vi.fn().mockResolvedValueOnce({
                    result: "success",
                    rates: {
                        TRY: 1,
                        USD: 0.039,
                        EUR: 0.044
                    },
                    time_last_update_utc: testDate
                })
            });

            const result = await initializeExchangeRates();

            expect(result).toEqual({
                dateUpdated: new Date(testDate),
                rates: {
                    TRY: 1,
                    USD: 1 / 0.039,
                    EUR: 1 / 0.044
                }
            });
        });

        it("should handle API error responses", async () => {
            mockFetch.mockResolvedValueOnce({
                ok: true,
                json: vi.fn().mockResolvedValueOnce({
                    result: "error",
                    "error-type": "invalid-key"
                })
            });

            await expect(initializeExchangeRates()).rejects.toThrow("invalid-key");
        });

        it("handles API error responses without `error-type`", async () => {
            mockFetch.mockResolvedValueOnce({
                ok: true,
                json: vi.fn().mockResolvedValueOnce({
                    result: "error"
                })
            });

            await expect(initializeExchangeRates()).rejects.toThrow("unknown");
        });

        it("should calculate inverse rates correctly", async () => {
            mockFetch.mockResolvedValueOnce({
                ok: true,
                json: vi.fn().mockResolvedValueOnce({
                    result: "success",
                    rates: {
                        TRY: 1,
                        USD: 2, // 1 TRY = 2 USD, so 1 USD = 0.5 TRY
                        EUR: 4 // 1 TRY = 4 EUR, so 1 EUR = 0.25 TRY
                    },
                    time_last_update_utc: "2025-01-02T01:02:03Z"
                })
            });

            const result = await initializeExchangeRates();
            expect(result.rates.USD).toBe(0.5); // 1 / 2.0
            expect(result.rates.EUR).toBe(0.25); // 1 / 4.0
        });

        it("should handle zero rates gracefully", async () => {
            mockFetch.mockResolvedValueOnce({
                ok: true,
                json: vi.fn().mockResolvedValueOnce({
                    result: "success",
                    rates: {
                        USD: 0 // This will cause division by zero
                    }
                })
            });

            const result = await initializeExchangeRates();
            expect(result.rates.USD).toBe(0);
        });

        it("should parse date correctly", async () => {
            const testDate = "2025-01-02T01:02:03Z";

            mockFetch.mockResolvedValueOnce({
                ok: true,
                json: vi.fn().mockResolvedValueOnce({
                    result: "success",
                    rates: {
                        TRY: 1,
                        USD: 0.039,
                        EUR: 0.044
                    },
                    time_last_update_utc: testDate
                })
            });

            const result = await initializeExchangeRates();
            expect(result.dateUpdated).toEqual(new Date(testDate));
            expect(result.dateUpdated.getTime()).toBe(new Date(testDate).getTime());
        });

        it("returns `TRY` rate as `1.0`", async () => {
            mockFetch.mockResolvedValueOnce({
                ok: true,
                json: vi.fn().mockResolvedValueOnce({
                    result: "success",
                    rates: {
                        TRY: 1
                    }
                })
            });

            const result = await initializeExchangeRates();
            expect(result.rates.TRY).toBe(1);
        });
    });

    describe("getExchangeRates", () => {
        it("returns global exchange rates when available", () => {
            const mockRates = {
                dateUpdated: new Date("2025-01-02T01:02:03Z"),
                rates: {
                    TRY: 1,
                    USD: 39,
                    EUR: 44
                }
            };
            (globalThis as any).__EXCHANGE_RATES__ = mockRates;

            const result = getExchangeRates();
            expect(result).toEqual(mockRates);
        });

        it("returns `undefined` when global exchange rates are not set", () => {
            delete (globalThis as any).__EXCHANGE_RATES__; // To make sure it's undefined

            const result = getExchangeRates();
            expect(result).toBeUndefined();
        });
    });
});
