<template>
    <v-app>
        <AppDrawer />

        <template v-if="$vuetify.breakpoint.smAndDown">
            <AppBar />
        </template>

        <MainContainer>
            <Nuxt />

            <AppFooter class="d-block d-md-none mt-16" />
        </MainContainer>
    </v-app>
</template>
