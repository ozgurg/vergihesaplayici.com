export default {
	isLoading({commit}, isLoading) {
		commit("isLoading", isLoading);
	},
	setRoutes({commit}, routes) {
		commit("setRoutes", routes);
	}
};