<template>
    <div>
        <Heading1 class="mt-lg-12">
            {{ page.title }}
        </Heading1>

        <InnerContainer>
            <div class="text-center text-md-start">
                <p class="mb-12 text-body-1">
                    vergihesaplayici.com, vergi hesaplar.
                </p>

                <OsitaIhemeVideo />
            </div>

            <div class="my-12">
                <template v-if="$vuetify.breakpoint.lgAndUp">
                    <AdsterraBanner728x90 :order="0" />
                </template>
                <template v-else-if="$vuetify.breakpoint.mdAndDown">
                    <AdsterraBanner300x250 :order="0" />
                </template>
            </div>

            <Heading2 :to="Hesaplayicilar.url">
                {{ Hesaplayicilar.title }}
            </Heading2>
            <CalculatorGrid />

            <div class="my-12">
                <template v-if="$vuetify.breakpoint.lgAndUp">
                    <AdsterraBanner728x90 :order="1" />
                </template>
                <template v-else-if="$vuetify.breakpoint.mdAndDown">
                    <AdsterraBanner300x250 :order="1" />
                </template>
            </div>

            <Heading2 to="/yazilar/">
                Yazılar
            </Heading2>
            <ArticleGrid :articles="articles" />

            <div class="mt-16">
                <template v-if="$vuetify.breakpoint.lgAndUp">
                    <AdsterraBanner728x90 :order="2" />
                </template>
                <template v-else-if="$vuetify.breakpoint.mdAndDown">
                    <AdsterraBanner300x250 :order="2" />
                </template>
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
            articles: await $content("/").sortBy("createdAt", "desc").limit(12).fetch()
        };
    }
};
</script>
