export const state = () => ({
    drawerState: null // "null" makes the initial state closed.
});

export const getters = {
    isDrawerOpen(state) {
        return state.drawerState === true;
    }
};

export const mutations = {
    TOGGLE_DRAWER(state) {
        state.drawerState = !state.drawerState;
    },
    SET_DRAWER_STATE(state, value) {
        state.drawerState = value;
    }
};

export const actions = {
    toggleDrawer({ commit }) {
        commit("TOGGLE_DRAWER");
    },
    setDrawerState({ commit }, value) {
        commit("SET_DRAWER_STATE", value);
    }
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
};
