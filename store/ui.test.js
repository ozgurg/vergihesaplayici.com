import store from "@/store/ui";

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
        it("[toggleDrawer] should toggle 'drawerState' value", () => {
            store.mutations.toggleDrawer(state);
            expect(state.drawerState).toBe(true);

            store.mutations.toggleDrawer(state);
            expect(state.drawerState).toBe(false);
        });

        it("[setDrawerState] should set 'drawerState'", () => {
            store.mutations.setDrawerState(state, true);
            expect(state.drawerState).toBe(true);

            store.mutations.setDrawerState(state, false);
            expect(state.drawerState).toBe(false);
        });
    });

    // TODO: Add tests for actions
});
