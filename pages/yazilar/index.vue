<template>
    <div>
        <AppBreadcrumbs :items="page.breadcrumbs" />

        <heading-1>
            {{ page.title }}
        </heading-1>

        <inner-container>
            <article-disclaimer-alert class="mb-12" />

            <v-row>
                <template v-for="_article in articles">
                    <v-col
                        :key="_article.slug"
                        cols="12"
                        lg="4">
                        <article-card-item :article="_article" />
                    </v-col>
                </template>
            </v-row>
        </inner-container>
    </div>
</template>

<script>
import { YazilarPageDef } from "@/domain/yazilar/index.page-def.js";
import { YazilarSlugPageDef } from "@/domain/yazilar/slug.page-def.js";
import { getAllArticles } from "@/domain/yazilar/db/_index.js";

const yazilarPage = YazilarPageDef();

export default {
    head() {
        return this.page.head;
    },
    async asyncData({ $content }) {
        const articles = await getAllArticles($content);
        const yazilarSlugPages = articles.map(YazilarSlugPageDef);
        return {
            page: yazilarPage,
            articles: yazilarSlugPages
        };
    }
};
</script>
