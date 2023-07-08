<template>
    <div>
        <AppBreadcrumbs :items="breadcrumbs()" />

        <Heading1>
            {{ article.title }}
        </Heading1>

        <InnerContainer>
            <template v-if="$vuetify.breakpoint.lgAndUp">
                <AdsterraBanner728x90 :order="0" class="d-flex mx-auto" />
            </template>
            <template v-else-if="$vuetify.breakpoint.mdAndDown">
                <AdsterraBanner300x250 :order="0" class="d-flex mx-auto" />
            </template>
            <v-divider class="mt-4 mb-12" />

            <nuxt-content :document="article" />

            <v-divider class="mb-2 mt-12" />
            <AdsterraNative
                :order="1"
                ad-key="18d820d42a43bbb54b363d01dc952cf3" />
            <v-divider class="mt-2 mb-12" />

            <Heading2
                class="mb-4">
                Diğer yazılar
            </Heading2>
            <v-row>
                <template v-for="_article in articles">
                    <v-col
                        :key="_article.slug"
                        cols="12"
                        lg="4">
                        <ArticleItem :article="_article" />
                    </v-col>
                </template>
            </v-row>

            <v-divider class="mb-2 mt-12" />
            <template v-if="$vuetify.breakpoint.lgAndUp">
                <AdsterraBanner468x60 :order="2" class="d-flex mx-auto" />
            </template>
            <template v-else-if="$vuetify.breakpoint.mdAndDown">
                <AdsterraBanner320x50 :order="2" class="d-flex mx-auto" />
            </template>
            <v-divider class="mt-2 mb-12" />
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
                    title: vm.article.title,
                    url: `/yazilar${vm.article.path}/`
                }
            ];
        }
    },
    async asyncData({ $content, params: { slug } }) {
        const article = await $content(slug).fetch();

        const otherArticles = await $content("/")
            .sortBy("createdAt", "desc")
            .limit(6)
            .where({ slug: { $ne: slug } })
            .fetch();

        return {
            articles: otherArticles,
            article,
            head: {
                title: article.title,
                description: article.description
            }
        };
    }
};
</script>
