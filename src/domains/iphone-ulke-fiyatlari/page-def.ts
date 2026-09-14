import type { UtilityPage } from "@/types/page-def.js";
import { icon_utility_iphoneUlkeFiyatlari as icon } from "@/utils/icons.js";
import { AraclarPageDef } from "@/domains/araclar/page-def.js";

export const IphoneUlkeFiyatlariPageDef = (): UtilityPage => {
    const parentPage = AraclarPageDef();

    const id = "iphone-ulke-fiyatlari";
    const title = "iPhone Ülke Fiyatları";
    const url = siteUrl("/iphone-ulke-fiyatlari");
    const breadcrumbs = [
        ...parentPage.breadcrumbs,
        { title, url }
    ];

    return {
        id,
        title,
        url,
        breadcrumbs,
        icon,
        head: {
            title: `${title} - Vergi Hesaplayıcı`,
            description: "Apple iPhone modellerinin dünya genelindeki (Türkiye, ABD, Almanya, Dubai, Japonya, İngiltere) resmi satış fiyatlarını USD bazında karşılaştırın.",
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
                        "inLanguage": "tr-TR"
                    }
                ]
            }
        }
    };
};
