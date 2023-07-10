<template>
    <v-app-bar
        app=""
        class="vh-app-bar"
        elevation="0"
        color="#121212">
        <v-app-bar-nav-icon
            aria-label="Menüyü aç"
            @click="toggleDrawer()" />

        <AppBarLogo />
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

<style lang="scss">
.vh-app-bar {
    border-bottom: 1px solid rgba(#fff, .12) !important
}
</style>
