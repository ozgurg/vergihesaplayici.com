<template>
    <v-app>
        <AppDrawer />

        <template v-if="$vuetify.breakpoint.smAndDown">
            <AppBar />
        </template>

        <MainContainer>
            <Nuxt />

            <app-footer class="d-block d-md-none mt-16" />
        </MainContainer>
    </v-app>
</template>
