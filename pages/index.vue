<template>
    <div>
        <heading-1 class="mt-lg-12">
            {{ page.title }}
        </heading-1>

        <inner-container>
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
                    <heading-2 :to="hesaplayicilarPage.url">
                        {{ hesaplayicilarPage.title }}
                    </heading-2>
                    <calculator-grid />
                </div>

                <div>
                    <heading-2 :to="yazilarPage.url">
                        {{ yazilarPage.title }}
                    </heading-2>
                    <article-grid :articles="articles" />
                </div>
            </div>
        </inner-container>
    </div>
</template>

<script>
import { AnaSayfaPageDef } from "@/domain/ana-sayfa/index.page-def.js";
import { HesaplayicilarPageDef } from "@/domain/hesaplayicilar/index.page-def.js";
import { YazilarPageDef } from "@/domain/yazilar/index.page-def.js";
import { YazilarSlugPageDef } from "@/domain/yazilar/slug.page-def.js";
import { getAllArticles } from "@/domain/yazilar/db/_index.js";

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
