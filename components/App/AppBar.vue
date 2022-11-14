<template>
    <v-app-bar app="">
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
