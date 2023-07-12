<template>
    <v-navigation-drawer
        v-model="isDrawerOpen"
        :permanent="$vuetify.breakpoint.mdAndUp"
        :color="color"
        app=""
        overlay-color="#000"
        overlay-opacity=".75"
        width="265">
        <template #prepend>
            <div class="px-4 py-4">
                <AppLogo class="py-4" />
            </div>
            <v-divider class="mx-4 mb-2" />
        </template>

        <div class="d-flex flex-column h-100">
            <CalculatorList />

            <v-list
                class="mb-auto"
                subheader="">
                <v-subheader>Döviz kurları</v-subheader>
                <v-list-item>
                    <ExchangeRateGrid />
                </v-list-item>
            </v-list>

            <template v-if="$vuetify.breakpoint.mdAndUp">
                <div class="pa-4">
                    <AppDrawerFooter />
                </div>
            </template>
        </div>
    </v-navigation-drawer>
</template>

<script>
export default {
    computed: {
        isDrawerOpen: {
            get() {
                const vm = this;
                return vm.$store.getters["ui/isDrawerOpen"];
            },
            set(value) {
                const vm = this;
                vm.$store.dispatch("ui/setDrawerState", value);
            }
        },
        color() {
            const vm = this;
            return vm.$vuetify.breakpoint.mdAndUp ? "#121212" : "#272727";
        }
    }
};
</script>

<style lang="scss">
@import "~vuetify/src/styles/styles.sass";

@media #{map-get($display-breakpoints, "sm-and-down")} {
    $vuetify-drawer-selector: ".v-navigation-drawer";

    html:has(#{$vuetify-drawer-selector}--open) {
        position: fixed;
        width: 100%;
        height: 100%;
        inset: 0;

        &, *:not(#{$vuetify-drawer-selector} *) {
            // FIXME: This is causing the parts under the overlay to look weird
            overflow: hidden !important
        }

        body {
            position: absolute;
            width: 100%;
            height: 100%;
            inset: 0;
            overflow: hidden
        }
    }

    #{$vuetify-drawer-selector} {
        height: 100% !important
    }
}
</style>
