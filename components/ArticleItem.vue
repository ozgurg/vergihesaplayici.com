<template>
    <v-card
        :to="url(article)"
        link=""
        class="h-100 d-flex flex-column pa-3">
        <v-card-title>
            {{ article.title }}
        </v-card-title>
        <v-card-subtitle>
            {{ article.createdAt }}
        </v-card-subtitle>
        <v-card-text>
            {{ article.description }}…
        </v-card-text>
        <v-card-actions>
            <v-btn text="" outlined="">
                <span>Devamını merak ettim</span>
                <v-icon>{{ icons.mdiChevronRight }}</v-icon>
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
import { mdiChevronRight } from "@mdi/js";

export default {
    data: () => ({
        icons: {
            mdiChevronRight
        }
    }),
    props: {
        article: {
            type: Object,
            required: true
        }
    },
    methods: {
        url(article) {
            return `/yazilar/${article.path}/`;
        }
    }
};
</script>
