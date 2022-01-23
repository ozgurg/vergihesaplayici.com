<template>
	<v-app>
        <AppDrawer app="" />

        <AppBar
            v-if="$vuetify.breakpoint.mobile"
            app="" />

        <Main>
            <AppBreadcrumbs v-if="shouldRenderBreadcrumbs" />

            <Nuxt />
        </Main>
    </v-app>
</template>

<script>
export default {
    computed: {
        shouldRenderBreadcrumbs() {
            const vm = this;
            return vm.$route.path !== "/" && vm.$route.name !== null;
        }
    }
};
</script>
