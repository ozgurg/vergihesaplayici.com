<template>
    <!-- eslint-disable vue/no-v-text-v-html-on-component vue/no-v-html -->
    <nuxt-link
        v-ripple=""
        class="vh-app-logo d-flex align-center justify-center px-4 rounded-pill"
        aria-label="Ana sayfaya git"
        :to="anaSayfaPage.url"
        v-html="logo" />
</template>

<script setup>
import { AnaSayfaPageDef } from "@/page-def/ana-sayfa.page-def.js";
import logo from "@/assets/img/logo.svg?raw";

const anaSayfaPage = AnaSayfaPageDef();
</script>

<!-- DO NOT make scoped -->
<style lang="scss">
.vh-app-logo {
    background: rgba($vh-color-primary, $vh-card-hover-opacity);
    height: 48px;
    svg {
        width: 192px;
        height: 25px
    }
    @include vh-real-hover {
        transition: background-color $secondary-transition;
        &:hover {
            background: rgba($vh-color-primary, $vh-card-hover-opacity * 2)
        }
    }
}
</style>
