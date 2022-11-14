import { fetchExchangeRate } from "@/utils/fetch-exchange-rate.js";

export const state = () => ({
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
        },
        INR: {
            sign: "₹",
            rate: 0
        },
        CNY: {
            sign: "¥",
            rate: 0
        }
    }
});

export const getters = {
    currencies(state) {
        return state.currencies;
    },
    availableCurrencies(state) {
        return Object.keys(state.currencies);
    },
    availableCurrenciesExceptTRY(state) {
        return Object.keys(state.currencies).filter(currency => currency !== "TRY");
    }
};

export const mutations = {
    SET_EXCHANGE_RATE(state, { currency, rate }) {
        state.currencies[currency].rate = rate;
    }
};

export const actions = {
    async loadExchangeRateFromApi({ state, commit }, currency) {
        if (currency === "TRY") return;

        if (state.currencies[currency].rate > 0) {
            return state.currencies[currency];
        }

        return await fetchExchangeRate(currency, "TRY")
            .then(rate => {
                commit("SET_EXCHANGE_RATE", {
                    currency,
                    rate
                });
                return state.currencies[currency];
            });
    }
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
};
