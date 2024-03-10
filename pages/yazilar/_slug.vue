<template>
    <div>
        <AppBreadcrumbs :items="page.breadcrumbs" />

        <Heading1>
            {{ page.title }}
        </Heading1>

        <InnerContainer>
            <div class="d-flex flex-column gap-16">
                <div>
                    <article-disclaimer-alert class="mb-12" />

                    <nuxt-content :document="nuxtContent" />

                    <article-disclaimer-alert class="mt-12" />
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
import { YazilarSlugPageDef } from "@/page-def/yazilar-slug.page-def.js";
import { getAllArticles, getArticleBySlug } from "@/data/articles.js";

export default {
    head() {
        return this.page.head;
    },
    async asyncData({
        $content,
        error,
        params: { slug }
    }) {
        const article = await getArticleBySlug(slug, $content);
        if (!article) {
            return error({ statusCode: 404 });
        }

        const yazilarSlugPage = YazilarSlugPageDef(article);

        const otherArticles = await getAllArticles($content, {
            limit: 15,
            where: { slug: { $ne: slug } }
        });
        const otherYazilarSlugPages = otherArticles.map(YazilarSlugPageDef);

        return {
            page: yazilarSlugPage,
            nuxtContent: article.nuxtContent,
            otherArticles: otherYazilarSlugPages
        };
    }
};
</script>
