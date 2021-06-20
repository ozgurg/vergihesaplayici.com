<template>
	<v-app>
        <AppDrawer app="" />

        <AppBar
            v-if="$vuetify.breakpoint.mobile"
            app="" />

        <Main>
            <AppBreadcrumbs
                v-if="breadcrumbs"
                :items="breadcrumbs" />

            <Nuxt />
        </Main>

        <Version />
    </v-app>
</template>

<script>
import { get } from "vuex-pathify";

export default {
    name: "DefaultLayout",
    computed: {
        breadcrumbs: get("ui/breadcrumbs")
    }
};
</script>
