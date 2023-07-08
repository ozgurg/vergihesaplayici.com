<template>
    <div>
        <Heading1>
            {{ page.title }}
        </Heading1>

        <InnerContainer>
            <p class="mb-10 text-subtitle-1">
                vergihesaplayici.com, vergi hesaplar.
            </p>

            <OsitaIhemeVideo />

            <div class="my-12">
                <template v-if="$vuetify.breakpoint.lgAndUp">
                    <AdsterraBanner728x90 :order="0" />
                </template>
                <template v-else-if="$vuetify.breakpoint.mdAndDown">
                    <AdsterraBanner300x250 :order="0" />
                </template>
            </div>

            <Heading2
                :to="Hesaplayicilar.url"
                class="mb-4">
                {{ Hesaplayicilar.title }}
            </Heading2>
            <CalculatorGrid />

            <div class="my-12">
                <template v-if="$vuetify.breakpoint.lgAndUp">
                    <AdsterraBanner468x60 :order="1" />
                </template>
                <template v-else-if="$vuetify.breakpoint.mdAndDown">
                    <AdsterraBanner320x50 :order="1" />
                </template>
            </div>

            <Heading2
                to="/yazilar/"
                class="mb-4">
                Bir takım yazılar
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
        </InnerContainer>

        <AdsterraNative
            :order="2"
            class="mt-16" />
    </div>
</template>

<script>
import page from "@/data/pages/ana-sayfa.page.js";
import Hesaplayicilar from "@/data/pages/hesaplayicilar.page.js";

export default {
    head() {
        return this.page.head;
    },
    data: () => ({
        page,
        Hesaplayicilar
    }),
    async asyncData({ $content }) {
        return {
            articles: await $content("/").sortBy("createdAt", "desc").limit(12).fetch()
        };
    }
};
</script>
