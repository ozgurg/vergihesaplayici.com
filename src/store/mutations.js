export default {
	SET_IS_LOADING(state, isLoading) {
		state.isLoading = isLoading;
	},
	SET_ROUTES(state, routes) {
		state.routes = routes;
	},
	SET_EXCHANGE_RATE(state, { currency, rate }) {
		state.exchangeRates[currency] = rate;
	}
};