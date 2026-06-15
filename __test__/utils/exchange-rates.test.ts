import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

describe("utils/exchange-rates.js", () => {
    const originalFetch = window.fetch;
    const mockFetch = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();
        vi.resetModules();
        window.fetch = mockFetch;
    });

    afterEach(() => {
        window.fetch = originalFetch;
    });

    it("returns exchange rates on successful fetch", async () => {
        mockFetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({
                result: "success",
                time_last_update_utc: "Tue, 16 Jun 2026 00:00:00 +0000",
                rates: {
                    TRY: 1,
                    USD: .03,
                    EUR: .028,
                    GBP: .024,
                    INR: 2.5,
                    CNY: .22
                }
            })
        });

        const { getExchangeRates } = await import("@/utils/exchange-rates.js");
        const rates = getExchangeRates();
        expect(rates).toBeDefined();
        expect(rates.rates.TRY).toBe(1);
        expect(rates.rates.USD).toBeCloseTo(1 / .03);
    });

    it("returns `0` for missing rates in success JSON", async () => {
        mockFetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({
                result: "success",
                time_last_update_utc: "Tue, 16 Jun 2026 00:00:00 +0000",
                rates: {} as any
            })
        });

        const { getExchangeRates } = await import("@/utils/exchange-rates.js");
        const rates = getExchangeRates();
        expect(rates.rates.TRY).toBe(0);
        expect(rates.rates.USD).toBe(0);
        expect(rates.rates.EUR).toBe(0);
        expect(rates.rates.GBP).toBe(0);
        expect(rates.rates.INR).toBe(0);
        expect(rates.rates.CNY).toBe(0);
    });

    it("returns fallback exchange rates when response is not ok", async () => {
        const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {
        });
        mockFetch.mockResolvedValueOnce({
            ok: false,
            status: 500
        });

        const { getExchangeRates } = await import("@/utils/exchange-rates.js");
        const rates = getExchangeRates();
        expect(rates).toBeDefined();
        expect(rates.rates.TRY).toBe(1);
        expect(warnSpy).toHaveBeenCalledWith(expect.stringContaining("API request failed with status 500"));
        warnSpy.mockRestore();
    });

    it("throws error when API returns error status", async () => {
        mockFetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({
                result: "error",
                "error-type": "invalid-key"
            })
        });

        await expect(import("@/utils/exchange-rates.js")).rejects.toThrow("invalid-key");
    });

    it("throws unknown error when API returns error status without error-type", async () => {
        mockFetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({
                result: "error"
            })
        });

        await expect(import("@/utils/exchange-rates.js")).rejects.toThrow("unknown");
    });

    it("returns fallback rates when fetch throws TypeError in development", async () => {
        const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {
        });
        mockFetch.mockRejectedValueOnce(new TypeError("Failed to fetch"));

        const { getExchangeRates } = await import("@/utils/exchange-rates.js");
        const rates = getExchangeRates();
        expect(rates).toBeDefined();
        expect(rates.rates.TRY).toBe(1);
        expect(warnSpy).toHaveBeenCalledWith(expect.stringContaining("Network error in development"));
        warnSpy.mockRestore();
    });

    it("rethrows error when non-fetch error is thrown", async () => {
        mockFetch.mockRejectedValueOnce(new Error("unexpected error"));

        await expect(import("@/utils/exchange-rates.js")).rejects.toThrow("unexpected error");
    });

    it("provides API provider credit", async () => {
        mockFetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({
                result: "success",
                time_last_update_utc: "Tue, 16 Jun 2026 00:00:00 +0000",
                rates: { TRY: 1, USD: 1, EUR: 1, GBP: 1, INR: 1, CNY: 1 }
            })
        });
        const { API_PROVIDER_CREDIT } = await import("@/utils/exchange-rates.js");
        expect(API_PROVIDER_CREDIT.url).toBeInstanceOf(URL);
        expect(API_PROVIDER_CREDIT.title).toBeDefined();
    });
});
