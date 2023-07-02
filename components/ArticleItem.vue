<template>
    <v-card
        :to="url(article)"
        link=""
        class="h-100 d-flex flex-column px-3 py-5 overflow-hidden">
        <v-card-title>
            {{ article.title }}
        </v-card-title>
        <v-card-text>
            {{ article.description }}…
        </v-card-text>
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
            return `/yazilar${article.path}/`;
        }
    }
};
</script>
