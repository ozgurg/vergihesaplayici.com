<template>
    <!-- eslint-disable vue/no-v-text-v-html-on-component vue/no-v-html -->
    <nuxt-link
        v-html="logo"
        v-bind="$attrs"
        aria-label="Ana sayfaya git"
        class="logo"
        to="/" />
</template>

<script>
import logo from "@/assets/img/logo.svg?raw";

export default {
    data: () => ({
        logo
    })
};
</script>

<style lang="scss" scoped="">
.logo {
    padding: 0 16px;
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: center;
    height: 56px;
    @media(min-width: 960px) {
        height: 64px
    }
}
</style>

<style scoped="">
:deep(svg) {
    width: 190px;
    height: auto
}
</style>
