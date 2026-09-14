import type { Page } from "@/types/page-def.js";
import { AnaSayfaPageDef } from "@/domains/ana-sayfa/page-def.js";

export const AraclarPageDef = (
    options?: { schema: { items?: Page[] } } | null
): Page => {
    const homePage = AnaSayfaPageDef();
    const parentPage = AnaSayfaPageDef();

    const id = "araclar";
    const title = "Araçlar";
    const url = siteUrl("/araclar");
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
            description: "iPhone ülke fiyatları karşılaştırması ve diğer pratik yardımcı araçlarımızı tek bir yerde bulun. Fiyat ve vergi analizlerinizi kolayca yapın.",
            canonicalUrl: url,
            ogImageUrl: null,
            schema: {
                "@context": "https://schema.org",
                "@graph": [
                    {
                        "@type": "CollectionPage",
                        "@id": `${url.href}#collectionpage`,
                        "url": url.href,
                        "name": title,
                        "isPartOf": { "@id": `${parentPage.url.href}#website` },
                        "about": { "@id": `${homePage.url.href}#organization` },
                        "inLanguage": "tr-TR",
                        "mainEntity": {
                            "@type": "ItemList",
                            "itemListElement": (options?.schema.items || []).map((_page, _index) => ({
                                "@type": "ListItem",
                                "position": _index + 1,
                                "item": {
                                    // @ts-expect-error: It is defined
                                    "@id": _page.head.schema["@graph"][0]["@id"]
                                }
                            }))
                        }
                    }
                ]
            }
        }
    };
};
