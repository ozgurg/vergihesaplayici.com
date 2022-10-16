<template>
    <v-navigation-drawer
        v-model="isDrawerOpen"
        app=""
        :permanent="$vuetify.breakpoint.mdAndUp"
        overlay-color="#000"
        overlay-opacity=".75"
        color="#272727"
        width="265"
        floating="">
        <template #prepend>
            <AppDrawerLogo />
        </template>

        <div class="d-flex flex-column h-100">
            <CalculatorList
                subheader="Hesaplayıcılar"
                shaped="" />

            <v-list class="mb-auto">
                <v-subheader>Döviz kurları</v-subheader>
                <v-list-item>
                    <ExchangeRateGrid />
                </v-list-item>
            </v-list>

            <AppDrawerFooter
                v-if="$vuetify.breakpoint.mdAndUp"
                class="mt-15" />
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
        }
    }
};
</script>

<style lang="scss">
@media(max-width: 959.98px) {
    $vh_drawerSelector: "v-navigation-drawer";

    html:has(.#{$vh_drawerSelector}--open) {
        position: fixed;
        width: 100%;
        height: 100%;
        inset: 0;
        &, *:not(.#{$vh_drawerSelector} *) {
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

    .#{$vh_drawerSelector} {
        height: 100% !important
    }
}
</style>
