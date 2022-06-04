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

    // TODO: Add tests for mutations
    // TODO: Add tests for actions
});
