import { fetchExchangeRate } from "@/utils/fetch-exchange-rate.js";

describe("utils/load-exchange-rate", () => {
    beforeEach(() => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve({
                    rates: {
                        TRY: 26.00
                    }
                })
            })
        );
    });

    it("should return the exchange rate for a given currency from the API", async () => {
        const rate = await fetchExchangeRate("USD", "TRY");

        expect(rate).toBe(26.00);
        expect(fetch).toHaveBeenCalledTimes(1);
    });
});
