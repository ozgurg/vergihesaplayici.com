import type { CalculatorPage } from "@/types/page-def.js";
import { icon_verginiOlustur as icon } from "@/utils/icons.js";
import { HesaplayicilarPageDef } from "@/domains/hesaplayicilar/page-def.js";
import { AnaSayfaPageDef } from "@/domains/ana-sayfa/page-def.js";

export const VerginiOlusturPageDef = (): CalculatorPage => {
    const homePage = AnaSayfaPageDef();
    const parentPage = HesaplayicilarPageDef();

    const id = "hesaplayici-vergini-olustur";
    const title = "Vergini Oluştur";
    const shortTitle = title;
    const url = siteUrl("/vergini-olustur");
    const ogImageUrl = staticSiteUrl("/og/vergini-olustur.jpg");
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
            description: "Kendi özel vergi oranlarınızı, KDV ve ek kesintilerinizi ekleyip çıkararak net fiyat ve vergi miktarını hesaplayabileceğiniz özel vergi şablonu oluşturucu.",
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
        summary: "Ekonomist olmak hiç bu kadar kolay olmamıştı"
    };
};
