<template>
    <v-app-bar app="">
        <v-app-bar-nav-icon
            aria-label="Menüyü aç"
            @click="toggleDrawer()" />

        <div class="d-flex justify-center flex-grow-1 h-100">
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
