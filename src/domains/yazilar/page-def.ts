import type { Page } from "@/types/page-def.js";
import type { Yazi } from "@/domains/yazilar/types.js";
import { AnaSayfaPageDef } from "@/domains/ana-sayfa/page-def.js";
import { getWordCount } from "@/domains/yazilar/utils.js";

export const YazilarPageDef = (
    options?: { schema: { items?: { url: URL }[] } } | null
): Page => {
    const homePage = AnaSayfaPageDef();
    const parentPage = AnaSayfaPageDef();

    const id = "yazilar";
    const title = "Yazılar";
    const url = siteUrl("/yazilar");
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
            description: "Vergiler hakkında rehber ve güncel bilgiler için doğru adrestesiniz. Makalelerimiz ve ipuçlarımızla vergi yükümlülüklerinizi kolayca anlayın.",
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
                                    "@id": `${_page.url.href}#article`
                                }
                            }))
                        }
                    }
                ]
            }
        }
    };
};

type Params = {
    yazi: Yazi;
};
export const YazilarSlugPageDef = ({ yazi }: Params): Page<Params> => {
    const homePage = AnaSayfaPageDef();
    const parentPage = YazilarPageDef();

    const id = "yazilar-slug";
    const title = yazi.title;
    const url = siteUrl(`/yazilar/${yazi.slug}`);

    const isVergiTuru = /\[\d{4}\]$/u.test(yazi.title);
    const breadcrumbs = isVergiTuru ?
        [
            ...parentPage.breadcrumbs,
            { title: "Vergi Türleri", url: siteUrl("/yazilar/vergi-turleri") },
            { title, url }
        ] :
        [
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
            description: yazi.description,
            canonicalUrl: url,
            ogImageUrl: null,
            schema: {
                "@context": "https://schema.org",
                "@graph": [
                    {
                        "@type": "Article",
                        "@id": `${url.href}#article`,
                        "url": url.href,
                        "headline": title,
                        "wordCount": getWordCount(yazi.entry.body || ""),
                        "description": yazi.description,
                        "abstract": yazi.description,
                        "isPartOf": { "@id": `${parentPage.url.href}#collectionpage` },
                        "publisher": { "@id": `${homePage.url.href}#organization` },
                        "inLanguage": "tr-TR",
                        "author": {
                            "@id": `${homePage.url.href}#organization`
                        },
                        "dateCreated": yazi.createdDate.toISOString(),
                        "datePublished": yazi.createdDate.toISOString(),
                        "dateModified": yazi.updatedDate ? yazi.updatedDate.toISOString() : yazi.createdDate.toISOString(),
                        "mainEntityOfPage": {
                            "@type": "WebPage",
                            "@id": url.href
                        }
                    }
                ]
            }
        },
        yazi
    };
};
