import type { CalculatorPage } from "@/types/page-def.js";
import { icon_gumrukVergisi as icon } from "@/utils/icons.js";
import { HesaplayicilarPageDef } from "@/domains/hesaplayicilar/page-def.js";
import { AnaSayfaPageDef } from "@/domains/ana-sayfa/page-def";

export const GumrukVergisiPageDef = (): CalculatorPage => {
    const homePage = AnaSayfaPageDef();
    const parentPage = HesaplayicilarPageDef();

    const id = "hesaplayici-gumruk";
    const title = "Gümrük Vergisi Hesaplayıcı";
    const shortTitle = "Gümrük";
    const url = siteUrl("/gumruk-vergisi");
    const ogImageUrl = staticSiteUrl("/og/gumruk-vergisi.jpg");
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
            description: "Yurt dışından gelen ürünler için ne kadar gümrük vergisi ödeyeceğinizi öğrenin. Gümrük Vergisi Hesaplayıcı ile hızlı ve kolay şekilde vergi tutarını hesaplayın.",
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
        summary: "Girebiliyor ama ne pahasına?"
    };
};
