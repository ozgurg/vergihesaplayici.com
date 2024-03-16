<template>
    <div>
        <AppBreadcrumbs :items="page.breadcrumbs" />

        <heading-1>
            {{ page.title }}
        </heading-1>

        <inner-container>
            <div class="d-flex flex-column gap-16">
                <div>
                    <article-disclaimer-alert class="mb-12" />

                    <nuxt-content :document="nuxtContent" />

                    <article-disclaimer-alert class="mt-12" />
                </div>

                <div>
                    <heading-2>
                        Diğer yazılar
                    </heading-2>
                    <article-grid :articles="otherArticles" />
                </div>
            </div>
        </inner-container>
    </div>
</template>

<script>
import { YazilarSlugPageDef } from "@/domain/yazilar/slug.page-def.js";
import { getAllArticles, getArticleBySlug } from "@/domain/yazilar/db/_index.js";

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
