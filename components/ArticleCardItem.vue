<template>
    <v-card
        :to="article.url"
        outlined=""
        class="px-4 py-6 px-lg-6 py-lg-8">
        <v-card-title class="pa-0 mb-4">
            {{ article.title }}
        </v-card-title>
        <v-card-text class="pa-0">
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
    }
};
</script>

<style lang="scss" scoped="">
.v-card {
    min-height: 192px;
    &__text {
        @include vh-ellipsis-multiline(4)
    }
}
</style>
