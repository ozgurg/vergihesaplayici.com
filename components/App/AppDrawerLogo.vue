<template>
    <nuxt-link
        v-bind="$attrs"
        class="logo"
        to="/">
        <img
            :src="require('@/assets/img/logo.svg')"
            alt="Vergi Hesaplayıcı Logo"
            draggable="false"
            height="25"
            width="190" />
    </nuxt-link>
</template>

<style lang="scss" scoped="">
.logo {
    height: 56px;
    padding: 0 16px;
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: center;
    @media(min-width: 960px) {
        height: 64px;
        background: #ffffff1f
    }
    img {
        vertical-align: middle;
        width: 190px;
        height: auto
    }
}
</style>
