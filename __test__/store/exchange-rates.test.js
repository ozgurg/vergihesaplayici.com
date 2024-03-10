import store from "@/store/exchange-rates.js";

describe("store/exchange-rates", () => {
    let state = {};

    beforeEach(() => {
        state = {
            currencies: {
                TRY: {
                    sign: "₺",
                    rate: 1
                },
                USD: {
                    sign: "$",
                    rate: 0
                },
                EUR: {
                    sign: "€",
                    rate: 0
                }
            }
        };
    });

    describe("mutations", () => {
        it("[SET_EXCHANGE_RATE] should set exchange rate of TRY to 26.00", () => {
            const currency = "TRY";
            const rate = 26.00;

            store.mutations.SET_EXCHANGE_RATE(state, {
                currency,
                rate
            });
            expect(state.currencies[currency].rate).toBe(rate);
        });
    });

    describe("actions", () => {
        let context = {};

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

            context = {
                state,
                commit: jest.fn()
            };
        });

        it("[loadExchangeRateFromApi] should return 'undefined' if currency is TRY", async () => {
            const loadExchangeRateFromApi = await store.actions.loadExchangeRateFromApi(context, "TRY");
            expect(loadExchangeRateFromApi).toBe(undefined);
        });

        it("[loadExchangeRateFromApi] should return currency object instead of make an API call if its exchange rate bigger than 0", async () => {
            const currency = "USD";
            state.currencies[currency].rate = 26.00;

            const loadExchangeRateFromApi = await store.actions.loadExchangeRateFromApi(context, currency);

            expect(loadExchangeRateFromApi).toStrictEqual(state.currencies[currency]);
            expect(fetch).toHaveBeenCalledTimes(0);
        });

        it("[loadExchangeRateFromApi] should make an API call, commit 'SET_EXCHANGE_RATE' and return currency object", async () => {
            const currency = "USD";

            const loadExchangeRateFromApi = await store.actions.loadExchangeRateFromApi(context, currency);

            expect(loadExchangeRateFromApi).toStrictEqual(state.currencies[currency]);

            expect(fetch).toHaveBeenCalledTimes(1);

            expect(context.commit).toHaveBeenCalledTimes(1);
            expect(context.commit).toHaveBeenCalledWith("SET_EXCHANGE_RATE", {
                currency,
                rate: 26.00
            });
        });
    });

    describe("getters", () => {
        it("[currencies] should return list of currencies as an array", () => {
            const currencies = store.getters.currencies(state);
            expect(currencies).toStrictEqual(state.currencies);
        });

        it("[availableCurrencies] should return list of available currencies as an array", () => {
            const availableCurrencies = store.getters.availableCurrencies(state);
            expect(availableCurrencies).toStrictEqual(["TRY", "USD", "EUR"]);
        });

        it("[availableCurrenciesExceptTRY] should return list of available currencies except TRY as an array", () => {
            const availableCurrenciesExceptTRY = store.getters.availableCurrenciesExceptTRY(state);
            expect(availableCurrenciesExceptTRY).toStrictEqual(["USD", "EUR"]);
        });
    });
});
