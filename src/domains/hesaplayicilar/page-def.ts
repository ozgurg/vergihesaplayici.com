import type { Page, PageDef } from "@/types/page-def.js";
import { AnaSayfaPageDef } from "@/domains/ana-sayfa/page-def.js";

const parentPage = AnaSayfaPageDef();

export const HesaplayicilarPageDef: PageDef = (): Page => {
    const title = "Hesaplayıcılar";
    const url = siteUrl("/hesaplayicilar");
    const breadcrumbs = [
        ...parentPage.breadcrumbs,
        { title, url }
    ];

    return {
        title,
        url,
        breadcrumbs,
        head: {
            title,
            description: "Telefon ve oyun konsolu gibi farklı ürün gruplarının yurt içi ve yurt dışı fiyatlarına Türkiye'de ne kadar vergi uygulandığını hesaplayın.",
            canonicalUrl: url,
            ogImageUrl: null
        }
    };
};
