<template>
    <div>
        <AppBreadcrumbs :items="page.breadcrumbs" />

        <Heading1>
            {{ page.title }}
        </Heading1>

        <InnerContainer>
            <v-row>
                <template v-for="_article in articles">
                    <v-col
                        :key="_article.slug"
                        cols="12"
                        lg="4">
                        <ArticleCardItem :article="_article" />
                    </v-col>
                </template>
            </v-row>
        </InnerContainer>
    </div>
</template>

<script>
import { YazilarPageDef } from "@/page-def/yazilar.page-def.js";

const yazilarPage = YazilarPageDef();

export default {
    head() {
        return this.page.head;
    },
    data: () => ({
        page: yazilarPage
    }),
    async asyncData({ $content }) {
        return {
            articles: await $content("/").sortBy("gitCreatedAt", "desc").fetch()
        };
    }
};
</script>
