<template>
    <v-navigation-drawer
        v-bind="$attrs"
        v-model="isDrawerOpen"
        :permanent="$vuetify.breakpoint.mdAndUp"
        color="#272727"
        width="275"
        floating="">
        <template #prepend>
            <AppDrawerLogo />
        </template>

        <div class="d-flex flex-column h-100">
            <CalculatorList
                title="Hesaplayıcılar"
                shaped="" />

            <v-list class="mb-auto">
                <v-subheader>Döviz kurları</v-subheader>
                <v-list-item>
                    <ExchangeRateGrid />
                </v-list-item>
            </v-list>

            <AppDrawerFooter class="mt-15" />
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
$vh_drawerSelector: "v-navigation-drawer";

html:has(.#{$vh_drawerSelector}--open.#{$vh_drawerSelector}--is-mobile) {
    position: fixed;
    width: 100%;
    height: 100%;
    bottom: 0;
    left: 0;
    right: 0;
    top: 0;
    &, *:not(.#{$vh_drawerSelector} *) {
        overflow: hidden !important
    }
    body {
        position: absolute;
        width: 100%;
        height: 100%;
        bottom: 0;
        left: 0;
        right: 0;
        top: 0;
        overflow: hidden
    }
}

.#{$vh_drawerSelector} {
    height: 100% !important
}
</style>
