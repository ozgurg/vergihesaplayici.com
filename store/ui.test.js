import store from "@/store/ui.js";

describe("store/ui", () => {
    let state = {};

    beforeEach(() => {
        state = {
            drawerState: null
        };
    });

    describe("state", () => {
        it("initial value of 'drawerState' should be 'null'", () => {
            expect(store.state().drawerState).toBe(state.drawerState);
        });
    });

    describe("getters", () => {
        it("[isDrawerOpen] return correct boolean value by 'drawerState'", () => {
            expect(store.getters.isDrawerOpen({ drawerState: null })).toBe(false);
            expect(store.getters.isDrawerOpen({ drawerState: true })).toBe(true);
            expect(store.getters.isDrawerOpen({ drawerState: false })).toBe(false);
        });
    });

    describe("mutations", () => {
        it("[TOGGLE_DRAWER] should toggle 'drawerState' value", () => {
            store.mutations.TOGGLE_DRAWER(state);
            expect(state.drawerState).toBe(true);

            store.mutations.TOGGLE_DRAWER(state);
            expect(state.drawerState).toBe(false);
        });

        it("[SET_DRAWER_STATE] should set 'drawerState'", () => {
            store.mutations.SET_DRAWER_STATE(state, true);
            expect(state.drawerState).toBe(true);

            store.mutations.SET_DRAWER_STATE(state, false);
            expect(state.drawerState).toBe(false);
        });
    });

    // TODO: Add tests for actions
});
