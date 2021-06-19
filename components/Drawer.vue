<template>
	<v-navigation-drawer
        v-bind="$attrs"
        v-model="drawerState">
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

        <Footer />
    </v-navigation-drawer>
</template>

<script>
import { sync } from "vuex-pathify";

export default {
    name: "Drawer",
    computed: {
        drawerState: sync("ui/drawerState")
    }
};
</script>
