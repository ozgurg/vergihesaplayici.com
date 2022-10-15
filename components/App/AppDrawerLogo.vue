<template>
    <!-- eslint-disable vue/no-v-text-v-html-on-component vue/no-v-html -->
    <nuxt-link
        v-bind="$attrs"
        class="vh-drawer-logo"
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
.vh-drawer-logo {
    padding: 0 1rem;
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: center;
    height: 56px;
    @media(min-width: 960px) {
        height: 64px
    }
    svg {
        width: 192px;
        height: auto
    }
}
</style>
