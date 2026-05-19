import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { API_PROVIDER_CREDIT, getExchangeRates } from "@/utils/exchange-rates.js";

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

    describe("getExchangeRates", () => {
        it("returns exchange rates", () => {
            const result = getExchangeRates();
            expect(result).toBeDefined();
            expect(result.rates).toBeDefined();
            expect(result.rates.TRY).toBe(1);
            expect(result.dateUpdated).toBeDefined();
        });
    });
});
