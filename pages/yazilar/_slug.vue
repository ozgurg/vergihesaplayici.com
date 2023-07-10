<template>
    <div>
        <AppBreadcrumbs :items="breadcrumbs()" />

        <Heading1>
            {{ article.title }}
        </Heading1>

        <div class="mb-12">
            <template v-if="$vuetify.breakpoint.lgAndUp">
                <AdsterraBanner728x90 :order="0" />
            </template>
            <template v-else-if="$vuetify.breakpoint.mdAndDown">
                <AdsterraBanner300x250 :order="0" />
            </template>
        </div>

        <InnerContainer>
            <nuxt-content :document="article" />

            <AdsterraNative
                :order="1"
                class="my-12" />

            <Heading2>
                Diğer yazılar
            </Heading2>
            <ArticleGrid :articles="articles" />
        </InnerContainer>

        <div class="mt-16">
            <template v-if="$vuetify.breakpoint.lgAndUp">
                <AdsterraBanner728x90 :order="2" />
            </template>
            <template v-else-if="$vuetify.breakpoint.mdAndDown">
                <AdsterraBanner300x250 :order="2" />
            </template>
        </div>
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
    async asyncData({
        $content,
        params: { slug }
    }) {
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
