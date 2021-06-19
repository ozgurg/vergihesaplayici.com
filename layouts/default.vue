<template>
	<v-app>
        <Drawer app="" />

        <AppBar app="" />

        <Main>
            <v-breadcrumbs
                v-if="breadcrumbs"
                :items="breadcrumbs">
                <template v-slot:item="{ item }">
                    <v-breadcrumbs-item
                        :to="item.to"
                        active-class=""
                        nuxt="">
                        {{ item.text }}
                    </v-breadcrumbs-item>
                </template>
            </v-breadcrumbs>

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
