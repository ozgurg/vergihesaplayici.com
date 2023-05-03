<template>
    <div>
        <PageTitle>
            {{ content.title }}
        </PageTitle>

        <InnerContainer>
            <nuxt-content :document="content" />

            <v-divider class="my-12" />

            <PageSubtitle
                class="mb-4">
                Diğer yazılar
            </PageSubtitle>
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
    async asyncData({ $content, params: { slug } }) {
        return {
            articles: await $content("/").sortBy("createdAt", "desc").fetch(),
            content: await $content(slug).fetch()
        };
    }
};
</script>
