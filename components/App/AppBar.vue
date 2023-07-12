<template>
    <v-app-bar
        app=""
        class="vh-app-bar"
        elevation="0"
        height="72"
        color="#121212">
        <v-app-bar-nav-icon
            aria-label="Menüyü aç"
            @click="toggleDrawer()" />

        <div class="d-flex justify-center flex-grow-1 h-100 py-2">
            <AppLogo class="vh-app-bar__logo" />
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

<style lang="scss">
@import "~vuetify/src/components/VToolbar/_variables.scss";

.vh-app-bar {
    border-block-end: 1px solid rgba(#fff, .12) !important;

    &__logo {
        margin-inline-start: -$toolbar-btn-icon-size
    }
}
</style>
