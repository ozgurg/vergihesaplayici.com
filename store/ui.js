export const state = () => ({
    drawerState: null // "null" makes the initial state closed
});

export const getters = {
    isDrawerOpen(state) {
        return state.drawerState === true;
    }
};

export const mutations = {
    toggleDrawer(state) {
        state.drawerState = !state.drawerState;
    },
    setDrawerState(state, value) {
        state.drawerState = value;
    }
};

export const actions = {
    toggleDrawer({ commit }) {
        commit("toggleDrawer");
    },
    setDrawerState({ commit }, value) {
        commit("setDrawerState", value);
    }
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
};
