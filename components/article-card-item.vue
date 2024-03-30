<template>
    <v-card
        :to="props.article.url"
        outlined=""
        class="px-4 py-6">
        <v-card-title class="pa-0 mb-6">
            {{ props.article.title }}
        </v-card-title>
        <v-card-subtitle class="pa-0">
            {{ props.article.description }}…
        </v-card-subtitle>
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
    .v-card__subtitle {
        @include vh-ellipsis-multiline(4)
    }
}
</style>
