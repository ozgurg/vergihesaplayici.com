<template>
    <v-app>
        <AppDrawer />

        <template v-if="$vuetify.breakpoint.smAndDown">
            <AppBar />
        </template>

        <MainContainer>
            <Nuxt />
        </MainContainer>

        <!-- We use tag="div", because AppFooter is already <footer />-->
        <template v-if="$vuetify.breakpoint.smAndDown">
            <v-footer
                app=""
                tag="div"
                inset=""
                padless=""
                class="mt-16 pa-8 d-block"
                color="transparent"
                absolute="">
                <AppFooter />
            </v-footer>
        </template>
    </v-app>
</template>
