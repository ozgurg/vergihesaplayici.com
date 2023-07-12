<template>
    <v-card
        :to="url()"
        outlined=""
        class="vh-article-card-item px-4 py-6 px-lg-6 py-lg-8">
        <v-card-title class="pa-0 mb-4">
            {{ article.title }}
        </v-card-title>
        <v-card-text class="vh-article-card-item__desc pa-0">
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
        // Making it "computed", causes Nuxt to fail to detect "yazilar/_slug" pages while "generate".
        // We should not depend on this behavior. It's not critical, but it would be nice to fix it.
        url() {
            const vm = this;
            return `/yazilar${vm.article.path}/`;
        }
    }
};
</script>

<style lang="scss" scoped="">
.vh-article-card-item {
    min-height: 192px;
    &__desc {
        @include vh-ellipsis-multiline(4)
    }
}
</style>
