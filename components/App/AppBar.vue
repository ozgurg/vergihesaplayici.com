<template>
    <v-app-bar app="">
        <v-app-bar-nav-icon
            aria-label="Menüyü aç"
            @click="openDrawer()" />

        <div class="d-flex justify-center flex-grow-1 h-100 py-2">
            <AppLogo />
        </div>
    </v-app-bar>
</template>

<script>
import { openDrawer } from "@/utils/drawer.js";

export default {
    methods: {
        openDrawer
    }
};
</script>
