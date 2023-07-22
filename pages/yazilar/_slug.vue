<template>
    <div>
        <AppBreadcrumbs :items="breadcrumbs()" />

        <Heading1>
            {{ article.title }}
        </Heading1>

        <InnerContainer>
            <div class="d-flex flex-column gap-16">
                <div>
                    <ArticleDisclaimerAlert class="mb-12" />

                    <nuxt-content :document="article" />

                    <ArticleDisclaimerAlert class="mt-12" />
                </div>

                <div>
                    <Heading2>
                        Diğer yazılar
                    </Heading2>
                    <ArticleGrid :articles="articles" />
                </div>
            </div>
        </InnerContainer>
    </div>
</template>

<script>
import { buildHeadTags } from "@/utils/build-head-tags.js";

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
            .sortBy("gitCreatedAt", "desc")
            .limit(6)
            .where({ slug: { $ne: slug } })
            .fetch();

        return {
            articles: otherArticles,
            article,
            head: buildHeadTags({
                title: article.title,
                description: article.description
            })
        };
    }
};
</script>
