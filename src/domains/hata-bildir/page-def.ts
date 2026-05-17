import type { Page } from "@/types/page-def.js";
import { AnaSayfaPageDef } from "@/domains/ana-sayfa/page-def.js";

export const HataBildirPageDef = (): Page => {
    const homePage = AnaSayfaPageDef();
    const parentPage = AnaSayfaPageDef();

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
            title: `${title} - Vergi Hesaplayıcı`,
            description: "vergihesaplayici.com'daki hesaplayıcılarda tespit ettiğiniz hataları bildirerek düzeltilmesine katkı sağlayın.",
            canonicalUrl: url,
            ogImageUrl: null,
            schema: {
                "@context": "https://schema.org",
                "@graph": [
                    {
                        "@type": "WebPage",
                        "@id": `${url.href}#webpage`,
                        "url": url.href,
                        "name": title,
                        "isPartOf": { "@id": `${parentPage.url.href}#website` },
                        "about": { "@id": `${homePage.url.href}#organization` },
                        "inLanguage": "tr-TR"
                    }
                ]
            }
        }
    };
};
