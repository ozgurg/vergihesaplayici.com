<template>
    <div>
        <PageTitle>
            Yazılar
        </PageTitle>

        <InnerContainer>
            <v-row>
                <template v-for="_article in articles">
                    <v-col
                        :key="_article.slug"
                        cols="12"
                        lg="6">
                        <ArticleItem :article="_article" />
                    </v-col>
                </template>
            </v-row>
        </InnerContainer>
    </div>
</template>

<script>

export default {
    async asyncData({ $content }) {
        return {
            articles: await $content("/").sortBy("createdAt", "desc").fetch()
        };
    }
};
</script>
