<template>
    <div>
        <AppBreadcrumbs :items="page.breadcrumbs" />

        <Heading1>
            {{ page.title }}
        </Heading1>

        <InnerContainer>
            <div class="d-flex flex-column gap-16">
                <div>
                    <ArticleDisclaimerAlert class="mb-12" />

                    <nuxt-content :document="nuxtContent" />

                    <ArticleDisclaimerAlert class="mt-12" />
                </div>

                <div>
                    <Heading2>
                        Diğer yazılar
                    </Heading2>
                    <article-grid :articles="otherArticles" />
                </div>
            </div>
        </InnerContainer>
    </div>
</template>

<script>
import { mapNuxtContentObjectAsArticle, YazilarSlugPageDef } from "@/page-def/yazilar-slug.page-def.js";

export default {
    head() {
        return this.page.head;
    },
    async asyncData({
        $content,
        error,
        params: { slug }
    }) {
        const nuxtContent = await $content(slug).fetch();
        if (!nuxtContent) {
            return error({ statusCode: 404 });
        }

        const article = mapNuxtContentObjectAsArticle(nuxtContent);

        const yazilarSlugPage = YazilarSlugPageDef(article);

        const otherNuxtContents = await $content("/")
            .sortBy("gitCreatedAt", "desc")
            .limit(15)
            .where({ slug: { $ne: slug } })
            .fetch();
        const otherArticles = otherNuxtContents.map(mapNuxtContentObjectAsArticle).map(YazilarSlugPageDef);

        return {
            page: yazilarSlugPage,
            nuxtContent,
            otherArticles
        };
    }
};
</script>
