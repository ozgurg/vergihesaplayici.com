<template>
    <v-row>
        <template v-for="_article in props.articles">
            <v-col
                :key="_article.title"
                cols="12"
                sm="6"
                md="4">
                <article-card-item :article="_article" />
            </v-col>
        </template>
    </v-row>
</template>

<script setup="">
const props = defineProps({
    articles: {
        type: Array,
        required: true
    }
});
</script>
