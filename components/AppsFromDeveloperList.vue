<template>
    <v-list
        v-bind="$attrs"
        role="list">
        <v-list-item
            v-for="(app, index) in apps"
            :key="index"
            :href="app.url"
            dense=""
            link=""
            role="listitem"
            rel="nofollow noopener noreferrer"
            target="_blank">
            <v-list-item-icon>
                <img
                    :alt="app.title"
                    :src="require(`@/assets/img/apps/${app.icon}`)"
                    loading="lazy"
                    draggable="false"
                    decoding="async"
                    height="24"
                    width="24" />
            </v-list-item-icon>

            <v-list-item-content>
                <v-list-item-title>{{ app.title }}</v-list-item-title>
            </v-list-item-content>
        </v-list-item>
    </v-list>
</template>

<script>
import androidApps from "@/data/android-apps";

export default {
    data: () => ({
        apps: androidApps
    })
};
</script>
