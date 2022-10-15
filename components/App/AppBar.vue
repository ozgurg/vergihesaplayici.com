<template>
    <v-app-bar
        app=""
        elevation="0">
        <v-app-bar-nav-icon
            aria-label="Menüyü aç"
            @click="toggleDrawer()" />

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
