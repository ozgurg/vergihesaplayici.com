<template>
	<v-app>
        <AppDrawer app="" />

        <AppBar
            v-if="$vuetify.breakpoint.smAndDown"
            app="" />

        <Main>
            <AppBreadcrumbs />

            <Nuxt />
        </Main>
    </v-app>
</template>

