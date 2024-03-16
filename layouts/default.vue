<template>
    <v-app>
        <AppDrawer />

        <template v-if="$vuetify.breakpoint.smAndDown">
            <AppBar />
        </template>

        <main-container>
            <Nuxt />

            <app-footer class="d-block d-md-none mt-16" />
        </main-container>
    </v-app>
</template>
