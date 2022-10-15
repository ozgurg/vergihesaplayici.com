<template>
    <!-- eslint-disable vue/no-v-text-v-html-on-component vue/no-v-html -->
    <nuxt-link
        class="vh-app-logo"
        aria-label="Ana sayfaya git"
        to="/"
        v-html="logo" />
</template>

<script>
import logo from "@/assets/img/logo.svg?raw";

export default {
    data: () => ({
        logo
    })
};
</script>

<style lang="scss">
.vh-app-logo {
    display: flex;
    place-content: center;
    svg {
        width: 192px;
        height: auto
    }
}
</style>
