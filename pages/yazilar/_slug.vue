<template>
    <div>
        <AppBreadcrumbs :items="breadcrumbs()" />

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
    head() {
        return this.head;
    },
    methods: {
        breadcrumbs() {
            const vm = this;
            return [
                {
                    title: "Yazılar",
                    url: "/yazilar/"
                },
                {
                    title: vm.content.title,
                    url: `/yazilar${vm.content.path}/`
                }
            ];
        }
    },
    async asyncData({ $content, params: { slug } }) {
        const content = await $content(slug).fetch();

        return {
            articles: await $content("/").sortBy("createdAt", "desc").fetch(),
            content,
            head: {
                title: content.title,
                description: content.description
            }
        };
    }
};
</script>
