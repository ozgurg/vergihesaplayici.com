<template>
    <v-app-bar
        v-bind="$attrs"
        elevation="0">
        <v-app-bar-nav-icon
            v-if="$vuetify.breakpoint.mdAndDown"
            @click="drawerState = !drawerState"
            aria-label="Menüyü aç" />

        <v-toolbar-title>{{ toolbarTitle }}</v-toolbar-title>
    </v-app-bar>
</template>

<script>
import { sync } from "vuex-pathify";

export default {
    name: "AppBar",
    computed: {
        drawerState: sync("ui/drawerState"),
        toolbarTitle: sync("ui/toolbarTitle")
    }
};
</script>
