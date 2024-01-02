<template>
    <v-main>
        <!-- px-5 set to align to v-app-bar-nav-icon -->
        <v-container class="px-5 px-md-12 my-8 my-md-16">
            <slot />
        </v-container>
    </v-main>
</template>

<style lang="scss" scoped="">
.v-main {
    transition: none
}
</style>
