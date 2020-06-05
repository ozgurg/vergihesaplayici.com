export default {
	isLoading(state) {
		return state.isLoading;
	},
	getRoutes(state) {
		return state.routes;
	},
	getCurrencies(state) {
		return Object.keys(state.exchangeRates);
	},
	getExchangeRate: state => currency => state.exchangeRates[currency]
};