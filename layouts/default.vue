<template>
    <v-app>
        <AppDrawer />

        <AppBar v-if="$vuetify.breakpoint.smAndDown" />

        <MainContainer>
            <Nuxt />
        </MainContainer>

        <!-- We use tag="div", because AppFooter is already <footer />-->
        <v-footer
            v-if="$vuetify.breakpoint.smAndDown"
            app=""
            tag="div"
            inset=""
            padless
            class="mt-15 d-block"
            color="transparent"
            absolute="">
            <AppFooter />
        </v-footer>
    </v-app>
</template>
