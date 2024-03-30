<template>
    <v-card
        :to="props.article.url"
        outlined=""
        class="px-4 py-6 px-lg-6 py-lg-8">
        <v-card-title class="pa-0 mb-4">
            {{ props.article.title }}
        </v-card-title>
        <v-card-text class="pa-0">
            {{ props.article.description }}…
        </v-card-text>
    </v-card>
</template>

<script setup="">
const props = defineProps({
    article: {
        type: Object,
        required: true
    }
});
</script>

<style lang="scss" scoped="">
.v-card {
    min-height: 192px;
    &__text {
        @include vh-ellipsis-multiline(4)
    }
}
</style>
