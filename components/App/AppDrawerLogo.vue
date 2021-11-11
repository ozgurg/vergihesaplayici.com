<template>
    <nuxt-link
        v-bind="$attrs"
        class="logo"
        to="/">
        <img
            :src="require('@/assets/img/logo.svg')"
            alt="Vergi Hesaplayıcı Logo"
            draggable="false"
            height="30"
            width="190" />
    </nuxt-link>
</template>

<style lang="scss" scoped="">
.logo {
    height: 64px;
    padding: 0 16px;
    background: #ffffff1f;
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
