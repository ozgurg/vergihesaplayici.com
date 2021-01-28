import { make } from "vuex-pathify";
import axios from "axios";

export const state = () => ({
	currencies: {
		TRY: { sign: "₺", rate: 1, title: "TRY" },
		USD: { sign: "$", rate: 0, title: "USD" },
		EUR: { sign: "€", rate: 0, title: "EUR" },
		INR: { sign: "₹", rate: 0, title: "INR" },
		CNY: { sign: "¥", rate: 0, title: "CNY" }
	}
});

export const mutations = {
	SET_EXCHANGE_RATE(state, { currency, rate }) {
		state.currencies[currency]["rate"] = rate;
	}
};

export const actions = {
	// ...make.actions(state),
	async loadExchangeRateFromApi({ state, commit }, currency) {
		if (currency === "TRY" || state.currencies[currency]["rate"] > 0) {
			return;
		}

		await axios.get(`https://api.exchangeratesapi.io/latest?base=${currency}&symbols=TRY`)
			.then(response => {
				commit("SET_EXCHANGE_RATE", {
					currency,
					rate: response["data"]["rates"]["TRY"]
				});
			});
	}
};

export const getters = {
	...make.getters(state),
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