<template>
    <div>
        <Heading1 class="mt-lg-12">
            {{ page.title }}
        </Heading1>

        <InnerContainer>
            <div class="d-flex flex-column gap-16">
                <div>
                    <div class="text-center text-md-start">
                        <p class="mb-12 text-body-1">
                            vergihesaplayici.com, vergi hesaplar.
                        </p>

                        <OsitaIhemeVideo />
                    </div>
                </div>

                <div>
                    <Heading2 :to="Hesaplayicilar.url">
                        {{ Hesaplayicilar.title }}
                    </Heading2>
                    <CalculatorGrid />
                </div>

                <div>
                    <Heading2 to="/yazilar/">
                        Yazılar
                    </Heading2>
                    <ArticleGrid :articles="articles" />
                </div>
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
            articles: await $content("/").sortBy("gitCreatedAt", "desc").limit(15).fetch()
        };
    }
};
</script>
