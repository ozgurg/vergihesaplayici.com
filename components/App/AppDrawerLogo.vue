<template>
    <nuxt-link
        v-bind="$attrs"
        class="logo"
        to="/">
        <img
            :src="logo"
            alt="Vergi Hesaplayıcı Logo"
            draggable="false"
            height="30"
            width="190" />
    </nuxt-link>
</template>

<script>
import logo from "@/assets/img/logo.svg";

export default {
    name: "AppDrawerLogo",
    data: () => ({
        logo
    })
};
</script>

<style lang="scss" scoped="">
.logo {
    height: 64px;
    padding: 0 16px;
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: center;
    @media(max-width: 960px) {
        height: 56px
    }

    img {
        vertical-align: middle;
        width: 190px;
        height: auto
    }
}
</style>
