<template>
	<v-navigation-drawer
        v-bind="$attrs"
        v-model="drawerState"
        :color="color"
        :permanent="$vuetify.breakpoint.mdAndUp"
        width="275"
        floating="">
        <template #prepend>
            <AppDrawerLogo />
        </template>

        <AppDrawerCalculatorList shaped="" />

        <v-divider />

        <v-list class="mb-auto">
            <v-subheader>Kurlar</v-subheader>
            <v-list-item>
                <ExchangeRates />
            </v-list-item>
        </v-list>

        <AppsFromDeveloperList
            class="mt-8"
            shaped=""
            aria-label="Geliştiriciden Uygulamalar" />

        <v-divider />

        <AppDrawerFooter />
    </v-navigation-drawer>
</template>

<script>
import { sync } from "vuex-pathify";

export default {
    computed: {
        drawerState: sync("ui/drawerState"),
        color() {
            const vm = this;
            return vm.$vuetify.theme.dark ? "#272727" : undefined;
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
