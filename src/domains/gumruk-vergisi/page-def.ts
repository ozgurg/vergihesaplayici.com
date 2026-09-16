import type { CalculatorPage } from "@/types/page-def.js";
import { icon_gumrukVergisi as icon } from "@/utils/icons.js";
import { HesaplayicilarPageDef } from "@/domains/hesaplayicilar/page-def.js";
import { AnaSayfaPageDef } from "@/domains/ana-sayfa/page-def.js";
import { version as APP_VERSION } from "@root/package.json";

export const GumrukVergisiPageDef = (): CalculatorPage => {
    const homePage = AnaSayfaPageDef();
    const parentPage = HesaplayicilarPageDef();

    const id = "hesaplayici-gumruk";
    const title = "Gümrük Vergisi Hesaplama";
    const shortTitle = "Gümrük";
    const url = siteUrl("/gumruk-vergisi");
    const ogImageUrl = staticSiteUrl("/og/gumruk-vergisi.jpg");
    const description = "Yurt dışından sipariş ettiğiniz ürünlerin gümrük vergisi ve limitlerini hesaplayın. Güncel gümrük vergisi hesaplama aracı ile net maliyeti öğrenin.";
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
                        "description": description,
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
                            "Avrupa Birliği ve diğer ülkeler için menşe bazlı gümrük vergisi hesabı",
                            "Paket ağırlığı ve muafiyet limiti aşımı denetimi",
                            "Ticari olmayan basılı yayın ve kitap muafiyeti",
                            "ÖTV (IV) sayılı liste kapsamındaki ürünler için ÖTV hesabı",
                            "İlave gümrük vergisi (İGV) tanımlama",
                            "Emsal navlun, gümrüğe sunma ücreti ve damga vergisi dahil toplam maliyet hesabı"
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
        summary: "Girebiliyor ama ne pahasına?"
    };
};
