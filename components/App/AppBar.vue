<template>
    <v-app-bar
        v-bind="$attrs"
        :color="color"
        elevation="0"
        flat=""
        class="v-bar--underline">
        <v-app-bar-nav-icon @click="toggleDrawer()" />

        <div class="w-100 d-flex justify-center">
            <AppDrawerLogo style="margin-left:-48px" />
        </div>
    </v-app-bar>
</template>

<script>
import { sync } from "vuex-pathify";

export default {
    name: "AppBar",
    methods: {
        toggleDrawer() {
            const vm = this;
            vm.drawerState = !vm.drawerState;
        }
    },
    computed: {
        drawerState: sync("ui/drawerState"),
        color() {
            const vm = this;
            return vm.$vuetify.theme.dark ? undefined : "white";
        }
    }
};
</script>
