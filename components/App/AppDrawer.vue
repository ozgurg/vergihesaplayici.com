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

            <template v-if="$vuetify.breakpoint.lgAndUp">
                <AdsterraBanner160x300 :order="2" class="d-flex mx-auto mt-3" />
            </template>

            <template v-if="$vuetify.breakpoint.mdAndUp">
                <AppDrawerFooter class="mt-15" />
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
