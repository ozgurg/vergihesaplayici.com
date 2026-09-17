import type { CalculatorPage } from "@/types/page-def.js";
import { icon_katmaDegerVergisi as icon } from "@/utils/icons.js";
import { HesaplayicilarPageDef } from "@/domains/hesaplayicilar/page-def.js";
import { AnaSayfaPageDef } from "@/domains/ana-sayfa/page-def.js";
import { version as APP_VERSION } from "@root/package.json";

export const KatmaDegerVergisiPageDef = (): CalculatorPage => {
    const homePage = AnaSayfaPageDef();
    const parentPage = HesaplayicilarPageDef();

    const id = "hesaplayici-kdv";
    const title = "KDV Hesaplama";
    const shortTitle = "KDV";
    const url = siteUrl("/kdv");
    const ogImageUrl = staticSiteUrl("/og/kdv.jpg");
    const description = "KDV dahil ve KDV hariç fiyat hesaplamalarını hızlıca yapın. %1, %10, %20 ve özel oranlarla KDV hesaplama ve tevkifat hesaplama aracı.";
    const breadcrumbs = [
        ...parentPage.breadcrumbs,
        { title, url }
    ];

    return {
        id,
        title,
        shortTitle,
        url,
        breadcrumbs,
        icon,
        head: {
            title: `${title} - Vergi Hesaplayıcı`,
            description,
            canonicalUrl: url,
            ogImageUrl,
            schema: {
                "@context": "https://schema.org",
                "@graph": [
                    {
                        "@type": "WebApplication",
                        "@id": `${url.href}#webapplication`,
                        "url": url.href,
                        "name": title,
                        description,
                        "isPartOf": { "@id": `${parentPage.url.href}#collectionpage` },
                        "about": { "@id": `${homePage.url.href}#organization` },
                        "author": { "@id": `${homePage.url.href}#organization` },
                        "inLanguage": "tr-TR",
                        "applicationCategory": "FinanceApplication",
                        "operatingSystem": "All",
                        "browserRequirements": "Requires JavaScript. Requires HTML5.",
                        "softwareVersion": APP_VERSION,
                        "screenshot": ogImageUrl,
                        "featureList": [
                            "KDV hariç tutardan KDV dahil tutar hesaplama",
                            "KDV dahil tutardan KDV hariç tutar hesaplama",
                            "KDV tutarından matrah (vergisiz tutar) hesaplama",
                            "Standart ve özel KDV oranı desteği"
                        ],
                        "offers": {
                            "@type": "Offer",
                            "price": "0",
                            "priceCurrency": "TRY"
                        }
                    }
                ]
            }
        },
        //language=HTML
        summary: `
            "Her şey değerlidir"
            <br />
            <em>– Katma Değer</em>
        `
    };
};
