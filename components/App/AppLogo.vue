<template>
    <!-- eslint-disable vue/no-v-text-v-html-on-component vue/no-v-html -->
    <nuxt-link
        v-ripple=""
        class="vh-app-logo d-flex align-center justify-center px-3 rounded-pill text--primary"
        aria-label="Ana sayfaya git"
        :to="AnaSayfa.url"
        v-html="logo" />
</template>

<script>
import AnaSayfa from "@/data/pages/ana-sayfa.page.js";
import logo from "@/assets/img/logo.svg?raw";

export default {
    data: () => ({
        AnaSayfa,
        logo
    })
};
</script>

<style lang="scss">
.vh-app-logo {
    background-color: rgba($vh-color-primary, $vh-card-hover-opacity);

    svg {
        width: 192px;
        height: 25px
    }

    @include vh-real-hover {
        transition: background-color $secondary-transition;
        &:hover {
            background-color: rgba($vh-color-primary, ($vh-card-hover-opacity * 2));
        }
    }
}
</style>
