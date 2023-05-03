<template>
    <div>
        <PageTitle>
            {{ page.title }}
        </PageTitle>

        <InnerContainer>
            <p class="mb-10 text-subtitle-1">
                vergihesaplayici.com, vergi hesaplar.
            </p>

            <OsitaIhemeVideo />

            <v-divider class="my-12" />

            <PageSubtitle
                :to="Hesaplayicilar.url"
                class="mb-4">
                {{ Hesaplayicilar.title }}
            </PageSubtitle>
            <CalculatorGrid />

            <v-divider class="my-12" />

            <PageSubtitle
                to="/yazilar/"
                class="mb-4">
                Bir takım yazılar
            </PageSubtitle>
            <v-row>
                <template v-for="_article in articles">
                    <v-col
                        :key="_article.slug"
                        cols="12"
                        lg="6">
                        <ArticleItem :article="_article" />
                    </v-col>
                </template>
            </v-row>
            <v-divider class="my-5" />
            <div class="text-right">
                <v-btn
                    to="/yazilar/"
                    color="primary"
                    text=""
                    outlined="">
                    Diğer garip yazıları bile okumak istiyorum
                </v-btn>
            </div>
        </InnerContainer>
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
            articles: await $content("/").sortBy("createdAt", "desc").limit(4).fetch()
        };
    }
};
</script>
