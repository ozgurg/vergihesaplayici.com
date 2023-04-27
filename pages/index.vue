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
            <v-list
                outlined=""
                rounded="">
                <template v-for="_article in articles">
                    <v-list-item
                        :key="_article.url"
                        :to="_article.url"
                        link="">
                        {{ _article.title }}
                    </v-list-item>
                </template>
            </v-list>
        </InnerContainer>
    </div>
</template>

<script>
import page from "@/data/pages/ana-sayfa.page.js";
import Hesaplayicilar from "@/data/pages/hesaplayicilar.page.js";
import { articles } from "@/data/articles.js";

export default {
    head() {
        return this.page.head;
    },
    data: () => ({
        page,
        Hesaplayicilar,
        articles
    })
};
</script>
