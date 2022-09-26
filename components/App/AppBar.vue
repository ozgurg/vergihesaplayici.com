<template>
    <v-app-bar
        v-bind="$attrs"
        elevation="0"
        flat=""
        class="v-bar--underline">
        <v-app-bar-nav-icon
            @click="toggleDrawer()"
            aria-label="Menüyü aç" />

        <div class="d-flex justify-center flex-grow-1">
            <AppDrawerLogo style="margin-left:-48px" />
        </div>
    </v-app-bar>
</template>

<script>
export default {
    methods: {
        toggleDrawer() {
            const vm = this;
            vm.$store.dispatch("ui/toggleDrawer");
        }
    }
};
</script>
