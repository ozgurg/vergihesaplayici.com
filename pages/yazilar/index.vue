<template>
    <div>
        <AppBreadcrumbs :items="breadcrumbs()" />

        <Heading1>
            Yazılar
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
import { buildHeadTags } from "@/utils/build-head-tags.js";

export default {
    head() {
        // Thanks to ChatGPT :)
        return buildHeadTags({
            title: "Yazılar",
            description: "Vergiler hakkında bilgi edinmek ve güncel vergi kanunlarına dair rehber arıyorsanız, doğru adrestesiniz! Vergilerle ilgili tüm detayları içeren kapsamlı makalelerimiz ve vergi ipuçlarımızla size yol gösteriyoruz. Vergi dünyasında kendinizi güvende hissetmek ve vergi yükümlülüklerinizi anlamak için sayfamızı keşfedin."
        });
    },
    methods: {
        breadcrumbs() {
            return [
                {
                    title: "Yazılar",
                    url: "/yazilar/"
                }
            ];
        }
    },
    async asyncData({ $content }) {
        return {
            articles: await $content("/").sortBy("gitCreatedAt", "desc").fetch()
        };
    }
};
</script>
