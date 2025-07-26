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
            description: "vergihesaplayici.com, Telefon Vergisi, Konsol Vergisi ve KDV gibi vergi hesaplayıcıları barındıran bir vergi hesaplayıcıdır.",
            canonicalUrl: url,
            ogImageUrl: null
        }
    };
};
