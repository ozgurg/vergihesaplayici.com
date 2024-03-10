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
                    <Heading2 :to="hesaplayicilarPage.url">
                        {{ hesaplayicilarPage.title }}
                    </Heading2>
                    <CalculatorGrid />
                </div>

                <div>
                    <Heading2 :to="yazilarPage.url">
                        {{ yazilarPage.title }}
                    </Heading2>
                    <article-grid :articles="articles" />
                </div>
            </div>
        </InnerContainer>
    </div>
</template>

<script>
import { AnaSayfaPageDef } from "@/page-def/ana-sayfa.page-def.js";
import { HesaplayicilarPageDef } from "@/page-def/hesaplayicilar.page-def.js";
import { YazilarPageDef } from "@/page-def/yazilar.page-def.js";
import { YazilarSlugPageDef } from "@/page-def/yazilar-slug.page-def.js";
import { getAllArticles } from "@/domain/articles.js";

const anaSayfaPage = AnaSayfaPageDef();
const hesaplayicilarPage = HesaplayicilarPageDef();
const yazilarPage = YazilarPageDef();

export default {
    head() {
        return this.page.head;
    },
    data: () => ({
        page: anaSayfaPage,
        hesaplayicilarPage,
        yazilarPage
    }),
    async asyncData({ $content }) {
        const articles = await getAllArticles($content, { limit: 15 });
        const yazilarSlugPages = articles.map(YazilarSlugPageDef);
        return {
            articles: yazilarSlugPages
        };
    }
};
</script>
