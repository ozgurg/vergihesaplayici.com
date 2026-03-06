import type { Page, PageDef } from "@/types/page-def.js";
import { AnaSayfaPageDef } from "@/domains/ana-sayfa/page-def.js";
import type { Yazi } from "@/domains/yazilar/types";

export const YazilarPageDef: PageDef = (): Page => {
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
            title: `${title} - %site-title%`,
            description: "Vergiler hakkında rehber ve güncel bilgiler için doğru adrestesiniz. Makalelerimiz ve ipuçlarımızla vergi yükümlülüklerinizi kolayca anlayın.",
            canonicalUrl: url,
            ogImageUrl: null,
            schema: {
                "@context": "https://schema.org",
                "@type": "CollectionPage",
                name: title,
                description: "Vergiler hakkında rehber ve güncel bilgiler için doğru adrestesiniz. Makalelerimiz ve ipuçlarımızla vergi yükümlülüklerinizi kolayca anlayın.",
                url: url.href
            }
        }
    };
};

type _Params = {
    yazi: Yazi;
};
type _PageDef = (params: _Params) => Page;
export const YazilarSlugPageDef: _PageDef = ({ yazi }): Page => {
    const parentPage = YazilarPageDef();

    const id = "yazilar-slug";
    const title = yazi.title;
    const url = siteUrl(`/yazilar/${yazi.slug}`);

    let breadcrumbs;
    const isVergiTuru = /\[\d{4}]$/.test(yazi.title);
    // oxlint-disable-next-line unicorn/prefer-ternary
    if (isVergiTuru) {
        breadcrumbs = [
            ...parentPage.breadcrumbs,
            { title: "Vergi Türleri", url: siteUrl("/yazilar/vergi-turleri") },
            { title, url }
        ];
    } else {
        breadcrumbs = [
            ...parentPage.breadcrumbs,
            { title, url }
        ];
    }

    return {
        id,
        title,
        url,
        breadcrumbs,
        head: {
            title: `${title} - %site-title%`,
            description: yazi.description,
            canonicalUrl: url,
            ogImageUrl: null,
            schema: {
                "@context": "https://schema.org",
                "@type": "Article",
                headline: title,
                description: yazi.description,
                url: url.href,
                author: {
                    "@type": "Person",
                    name: "vergihesaplayici.com",
                    url: siteUrl().href
                },
                publisher: {
                    "@type": "Organization",
                    name: "Vergi Hesaplayıcı",
                    logo: {
                        "@type": "ImageObject",
                        url: siteUrl("/pwa/favicon-96x96.png").href
                    }
                },
                datePublished: yazi.createdDate.toISOString(),
                dateModified: yazi.updatedDate ? yazi.updatedDate.toISOString() : yazi.createdDate.toISOString()
            }
        }
    };
};
