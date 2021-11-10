<template>
	<v-navigation-drawer
        v-bind="$attrs"
        v-model="drawerState"
        :color="color"
        width="300"
        floating="">
        <template v-slot:prepend>
            <AppDrawerLogo />
        </template>

        <CalculatorList
            shaped=""
            subheader="Hesaplayıcılar" />

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
