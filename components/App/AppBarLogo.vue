<template>
    <div class="d-flex justify-center flex-grow-1 h-100">
        <AppLogo class="vh-app-bar-logo" />
    </div>
</template>

<style lang="scss">
@import "~vuetify/src/components/VToolbar/_variables.scss";

.vh-app-bar-logo {
    height: 100%;
    margin-left: -$toolbar-btn-icon-size
}
</style>
