<template>
    <v-navigation-drawer
        v-model="isDrawerOpen"
        :permanent="$vuetify.breakpoint.mdAndUp"
        color="#121212"
        app=""
        overlay-color="#000"
        overlay-opacity=".75"
        touchless=""
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
        </div>

        <template
            v-if="$vuetify.breakpoint.mdAndUp"
            #append>
            <div class="pa-4">
                <AppFooter />
            </div>
        </template>
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
        }
    }
};
</script>

<!-- DO NOT make scoped -->
<style lang="scss">
@import "~vuetify/src/styles/styles.sass";

// DO NOT replace with your own class name
$vuetify-drawer-selector: ".v-navigation-drawer";

@media #{map-get($display-breakpoints, "sm-and-down")} {
    html:has(#{$vuetify-drawer-selector}--open) {
        position: fixed;
        width: 100%;
        height: 100%;
        inset: 0;
        &,
        *:not(#{$vuetify-drawer-selector} *) {
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
