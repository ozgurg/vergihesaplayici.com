import type { Page, PageDef } from "@/types/page-def.js";

export const AnaSayfaPageDef: PageDef = (): Page => {
    const id = "ana-sayfa";
    const title = "Ana Sayfa";
    const url = siteUrl();
    const breadcrumbs = [
        { title, url }
    ];

    return {
        id,
        title,
        url,
        breadcrumbs,
        head: {
            title: "Vergi Hesaplayıcı",
            description: "vergihesaplayici.com, Telefon Vergisi, Konsol Vergisi ve KDV gibi vergi hesaplayıcıları barındıran bir vergi hesaplayıcıdır.",
            canonicalUrl: url,
            ogImageUrl: null,
            schema: {
                "@context": "https://schema.org",
                "@graph": [
                    {
                        "@type": "Organization",
                        "@id": `${url.href}#organization`,
                        "name": "Vergi Hesaplayıcı",
                        "url": url.href,
                        "sameAs": [
                            "https://x.com/vergihesaplar",
                            "https://github.com/ozgurg/vergihesaplayici.com"
                        ],
                        "logo": {
                            "@type": "ImageObject",
                            "url": staticUrl("/logo.png").href,
                            "width": "400",
                            "height": "53"
                        }
                    },
                    {
                        "@type": "WebSite",
                        "@id": `${url.href}#website`,
                        "url": url.href,
                        "name": "Vergi Hesaplayıcı",
                        "publisher": { "@id": `${url.href}#organization` }
                    },
                    {
                        "@type": "WebPage",
                        "@id": `${url.href}#webpage`,
                        "url": url.href,
                        "name": title,
                        "isPartOf": { "@id": `${url.href}#website` },
                        "about": { "@id": `${url.href}#organization` },
                        "inLanguage": "tr-TR"
                    }
                ]
            }
        }
    };
};
