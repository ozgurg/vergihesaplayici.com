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

                        <osita-iheme-video />
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
import { AnaSayfaPageDef } from "@/page-def/ana-sayfa.page-def.js";
import Hesaplayicilar from "@/data/pages/hesaplayicilar.page.js";

const anaSayfaPage = AnaSayfaPageDef();

export default {
    head() {
        return this.page.head;
    },
    data: () => ({
        page: anaSayfaPage,
        Hesaplayicilar
    }),
    async asyncData({ $content }) {
        return {
            articles: await $content("/").sortBy("gitCreatedAt", "desc").limit(15).fetch()
        };
    }
};
</script>
