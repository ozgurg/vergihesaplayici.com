import type { Page, PageDef } from "@/types/page-def.js";

export const AnaSayfaPageDef: PageDef = (): Page => {
    const title = "Ana Sayfa";
    const url = siteUrl();
    const breadcrumbs = [
        { title, url }
    ];

    return {
        title,
        url,
        breadcrumbs,
        head: {
            title: null,
            description: "Telefon ve oyun konsolu gibi farklı ürün gruplarının yurt içi ve yurt dışı fiyatlarına Türkiye'de ne kadar vergi uygulandığını hesaplayın.",
            canonicalUrl: url,
            ogImageUrl: null
        }
    };
};
