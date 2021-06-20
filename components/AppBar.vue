<template>
    <v-app-bar
        v-bind="$attrs"
        :color="color"
        elevation="0"
        flat=""
        class="v-bar--underline">
        <template v-if="$vuetify.breakpoint.mobile">
            <v-app-bar-nav-icon @click="drawerState = !drawerState" />

            <div class="w-100 d-flex justify-center">
                <Logo style="margin-left:-48px" />
            </div>
        </template>
    </v-app-bar>
</template>

<script>
import { sync } from "vuex-pathify";

export default {
    name: "AppBar",
    computed: {
        drawerState: sync("ui/drawerState"),
        color() {
            const vm = this;
            return vm.$vuetify.theme.dark ? undefined : "white";
        }
    }
};
</script>
