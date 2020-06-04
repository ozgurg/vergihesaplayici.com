import axios from "axios";


export default {
	setIsLoading({ commit }, isLoading) {
		commit("SET_IS_LOADING", isLoading);
	},
	setRoutes({ commit }, routes) {
		commit("SET_ROUTES", routes);
	},
	getExchangeRateFromApi: async ({ state, commit }, currency) => {
		if (currency === "TRY") {
			return;
		}

		// Load if only not loaded before
		if (state.exchangeRates[currency] === 0) {
			return axios.get(`https://api.exchangeratesapi.io/latest?base=${currency}&symbols=TRY`)
				.then(response => response.data)
				.then(latestCurrency => {
					commit("SET_EXCHANGE_RATE", {
						currency,
						rate: latestCurrency["rates"]["TRY"]
					});
				});
		}
	}
};