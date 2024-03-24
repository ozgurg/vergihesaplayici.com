<template>
    <v-app-bar app="">
        <v-app-bar-nav-icon
            aria-label="Menüyü aç"
            @click="openDrawer()" />

        <div class="d-flex align-center justify-center flex-1">
            <app-logo />
        </div>
    </v-app-bar>
</template>

<script setup>
import { openDrawer } from "@/utils/drawer.js";
</script>

<style lang="scss">
.v-app-bar {
    background: transparentize($vh-color-app-bar, .18) !important;
    backdrop-filter: blur(1rem);
    box-shadow: none !important;
    height: $vh-app-bar-height !important;
    border-block-end: 1px solid rgba(#fff, .12) !important;
    @media #{map-get($display-breakpoints, "md-and-up")} {
        display: none !important
    }
    .v-toolbar__content {
        height: 100% !important
    }
    .vh-app-logo {
        margin-inline-start: -48px // Width of <v-app-bar-nav-icon />
    }
}
</style>
