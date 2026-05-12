import type { CalculatorPage, CalculatorPageDef } from "@/types/page-def.js";
import { icon_kdvHesaplayici as icon } from "@/utils/icons.js";
import { HesaplayicilarPageDef } from "@/domains/hesaplayicilar/page-def.js";
import { AnaSayfaPageDef } from "@/domains/ana-sayfa/page-def";

export const KdvHesaplayiciPageDef: CalculatorPageDef = (): CalculatorPage => {
    const homePage = AnaSayfaPageDef();
    const parentPage = HesaplayicilarPageDef();

    const id = "hesaplayici-kdv";
    const title = "KDV Hesaplayıcı";
    const shortTitle = "KDV";
    const url = siteUrl("/kdv-hesaplayici");
    const ogImageUrl = staticSiteUrl("/og/kdv-hesaplayici.jpg");
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
            description: "Katma Değer Vergisi (KDV) Hesaplayıcı aracını KDV hariç fiyattan KDV dahil fiyatı veya KDV dahil fiyattan KDV hariç fiyatı hesaplamak için kullanabilirsiniz.",
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
                        "isPartOf": { "@id": `${parentPage.url.href}#collectionpage` },
                        "about": { "@id": `${homePage.url.href}#organization` },
                        "inLanguage": "tr-TR",
                        "applicationCategory": "FinanceApplication",
                        "operatingSystem": "All",
                        "screenshot": ogImageUrl,
                        "offers":{
                            "@type":"Offer",
                            "price":"0",
                            "priceCurrency":"TRY"
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
