export default {
	setIsLoading({commit}, isLoading) {
		commit("SET_IS_LOADING", isLoading);
	},
	setRoutes({commit}, routes) {
		commit("SET_ROUTES", routes);
	}
};