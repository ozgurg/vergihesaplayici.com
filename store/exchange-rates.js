export const state = () => ({
    currencies: {
        TRY: { sign: "₺", rate: 1 },
        USD: { sign: "$", rate: 0 },
        EUR: { sign: "€", rate: 0 },
        INR: { sign: "₹", rate: 0 },
        CNY: { sign: "¥", rate: 0 }
    }
});

export const mutations = {
    SET_EXCHANGE_RATE(state, { currency, rate }) {
        state.currencies[currency]["rate"] = rate;
    }
};

export const actions = {
    async loadExchangeRateFromApi({ state, commit }, currency) {
        if (currency === "TRY" || state.currencies[currency]["rate"] > 0) return;

        return await fetch(`https://api.exchangerate.host/latest?base=${currency}&symbols=TRY`)
            .then(response => response.json())
            .then(response => {
                commit("SET_EXCHANGE_RATE", {
                    currency,
                    rate: response["rates"]["TRY"]
                });
            }).then(() => state.currencies[currency]);
    }
};

export const getters = {
    availableCurrencies(state) {
        return Object.keys(state.currencies);
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
};
