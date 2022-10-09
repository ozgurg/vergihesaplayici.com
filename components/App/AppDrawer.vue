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

        <CalculatorList
            title="Hesaplayıcılar"
            shaped="" />

        <v-list class="mb-auto">
            <v-subheader>Döviz kurları</v-subheader>
            <v-list-item>
                <ExchangeRatesGrid />
            </v-list-item>
        </v-list>

        <AppDrawerFooter />
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

<style scoped="">
:deep(.v-navigation-drawer__content) {
    display: flex;
    flex-direction: column
}
</style>
