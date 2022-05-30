<template>
    <!-- eslint-disable vue/no-v-html -->
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

<style scoped="">
.logo {
    height: 56px;
    padding: 0 16px;
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: center
}

@media(min-width: 960px) {
    .logo {
        height: 64px
    }
}

/deep/ svg {
    width: 190px;
    height: auto
}
</style>
