import type { Page } from "@/types/page-def.js";
import { AnaSayfaPageDef } from "@/domains/ana-sayfa/page-def.js";

export const HesaplayicilarPageDef = (
    options?: { schema: { items?: Page[] } } | null
): Page => {
    const homePage = AnaSayfaPageDef();
    const parentPage = AnaSayfaPageDef();

    const id = "hesaplayicilar";
    const title = "Hesaplayıcılar";
    const url = siteUrl("/hesaplayicilar");
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
            description: "Telefon ve oyun konsolu gibi farklı ürün gruplarının yurt içi ve yurt dışı fiyatlarına Türkiye'de ne kadar vergi uygulandığını hesaplayın.",
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
