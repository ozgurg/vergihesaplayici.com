<template>
	<v-navigation-drawer
        v-bind="$attrs"
        v-model="drawerState"
        :color="color"
        floating="">
        <template v-slot:prepend>
            <Logo />
        </template>

        <CalculatorList
            shaped=""
            show-short-title=""
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

        <Footer />
    </v-navigation-drawer>
</template>

<script>
import { sync } from "vuex-pathify";

export default {
    name: "AppDrawer",
    computed: {
        drawerState: sync("ui/drawerState"),
        color() {
            const vm = this;
            return vm.$vuetify.theme.dark ? "#272727" : undefined;
        }
    }
};
</script>
