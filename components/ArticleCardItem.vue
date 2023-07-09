<template>
    <v-card
        :to="url(article)"
        outlined=""
        class="px-4 py-6 px-lg-6 py-lg-8">
        <v-card-title class="pa-0 mb-4">
            {{ article.title }}
        </v-card-title>
        <v-card-text
            :class="$style.description"
            class="pa-0">
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
        // Making it "computed", causes Nuxt to fail to detect "yazilar/_slug" pages while "generate"
        url(article) {
            return `/yazilar${article.path}/`;
        }
    }
};
</script>

<style lang="scss" scoped="" module="">
.description {
    @include vh-ellipsis-multiline(4)
}
</style>
