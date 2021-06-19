<template>
	<v-app>
        <Drawer app=""/>

        <AppBar app=""/>

        <Main>
            <v-breadcrumbs
                v-if="$store.get('ui/breadcrumbs')"
                :items="$store.get('ui/breadcrumbs')">
                <template v-slot:item="{ item }">
                    <v-breadcrumbs-item
                        active-class=""
                        nuxt=""
                        :to="item.to">
                        {{ item.text }}
                    </v-breadcrumbs-item>
                </template>
            </v-breadcrumbs>

            <Nuxt/>
        </Main>

        <span class="version">v{{ version }}</span>
    </v-app>
</template>

<script>
import { version } from "./../package.json";

export default {
    name: "DefaultLayout",
    data: () => ({
        version
    })
};
</script>
