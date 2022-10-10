<template>
    <v-app-bar
        v-bind="$attrs"
        elevation="0">
        <v-app-bar-nav-icon
            @click="toggleDrawer()"
            aria-label="Menüyü aç" />

        <div class="d-flex justify-center flex-grow-1">
            <AppBarLogo />
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
