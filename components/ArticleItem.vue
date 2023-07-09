<template>
    <v-card
        :to="url(article)"
        outlined=""
        class="vh-article-item h-100 px-4 py-8 overflow-hidden">
        <v-card-title class="pt-0">
            {{ article.title }}
        </v-card-title>
        <v-card-text class="pb-0">
            {{ article.description }}…
        </v-card-text>
    </v-card>
</template>

<script>
export default {
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
