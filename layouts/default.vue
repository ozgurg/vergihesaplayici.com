<template>
    <v-app>
        <app-drawer />

        <template v-if="$vuetify.breakpoint.smAndDown">
            <app-bar />
        </template>

        <main-container>
            <Nuxt />

            <app-footer class="d-block d-md-none mt-16" />
        </main-container>
    </v-app>
</template>
