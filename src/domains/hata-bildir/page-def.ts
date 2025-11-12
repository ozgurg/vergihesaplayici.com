import type { Page, PageDef } from "@/types/page-def.js";
import { AnaSayfaPageDef } from "@/domains/ana-sayfa/page-def.js";

const parentPage = AnaSayfaPageDef();

export const HataBildirPageDef: PageDef = (): Page => {
    const id = "hata-bildir";
    const title = "Hata Bildir";
    const url = siteUrl("/hata-bildir");
    const breadcrumbs = [
        ...parentPage.breadcrumbs,
        { title, url }
    ];

    return {
        id,
        title,
        url,
        breadcrumbs,
        head: {
            title,
            description: "vergihesaplayici.com'daki hesaplayıcılarda tespit ettiğiniz hataları bildirerek düzeltilmesine katkı sağlayın.",
            canonicalUrl: url,
            ogImageUrl: null
        }
    };
};
