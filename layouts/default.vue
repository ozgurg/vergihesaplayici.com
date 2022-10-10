<template>
    <v-app>
        <AppDrawer app="" />

        <AppBar
            v-if="$vuetify.breakpoint.smAndDown"
            app="" />

        <AppMain>
            <AppBreadcrumbs />

            <Nuxt />
        </AppMain>
    </v-app>
</template>
