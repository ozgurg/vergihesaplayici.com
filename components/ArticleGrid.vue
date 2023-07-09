<template>
    <v-row>
        <template v-for="_article in articles">
            <v-col
                :key="_article.title"
                cols="12"
                sm="6"
                md="4">
                <ArticleCardItem :article="_article" />
            </v-col>
        </template>
    </v-row>
</template>

<script>
export default {
    props: {
        articles: {
            type: Array,
            required: true
        }
    }
};
</script>
