<template>
    <v-app>
        <AppDrawer app="" />

        <AppBar
            v-if="$vuetify.breakpoint.smAndDown"
            app="" />

        <AppMain>
            <Nuxt />
        </AppMain>
    </v-app>
</template>
