<template>
	<v-app>
        <AppDrawer app="" />

        <AppBar
            v-if="$vuetify.breakpoint.mobile"
            app="" />

        <Main>
            <AppBreadcrumbs />

            <Nuxt />
        </Main>
    </v-app>
</template>

