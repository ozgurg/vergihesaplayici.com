import type { CalculatorPage, Page } from "@/types/page-def.js";
import type { Brand, Preset } from "@/domains/telefon-vergisi/types.js";
import { icon_telefonVergisi as icon } from "@/utils/icons.js";
import { HesaplayicilarPageDef } from "@/domains/hesaplayicilar/page-def.js";
import { AnaSayfaPageDef } from "@/domains/ana-sayfa/page-def.js";
import { version as APP_VERSION } from "@root/package.json";

export const TelefonVergisiPageDef = (): CalculatorPage => {
    const homePage = AnaSayfaPageDef();
    const parentPage = HesaplayicilarPageDef();

    const id = "hesaplayici-telefon";
    const title = "Telefon Vergisi Hesaplama";
    const shortTitle = "Telefon";
    const url = siteUrl("/telefon-vergisi-hesaplayici");
    const ogImageUrl = staticSiteUrl("/og/telefon-vergisi.jpg");
    const description = "Akıllı telefonların ÖTV, KDV, TRT payı ve Kültür Bakanlığı payı dahil tüm vergilerini hesaplayın. Vergisiz fiyat ve yurt dışı karşılaştırmalarını görün.";
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
                            "Vergili fiyattan vergisiz fiyat hesaplama",
                            "Vergisiz fiyattan vergili fiyat hesaplama",
                            "Türkiye ithalat kaydı üzerinden vergi hesaplama",
                            "Yolcu beraberi pasaport kaydı üzerinden harç hesaplama",
                            "Apple iPhone ve popüler telefon modelleri ön tanımlı fiyat listesi"
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
            "O ney vatandaş, 1.03 tane de bana ver."
            <br />
            <em>– Vergili Mıçı</em>
        `
    };
};

type Params = {
    preset: Preset;
    brand: Brand;
};
export const TelefonVergisiPresetSlugPageDef = ({ preset, brand }: Params): Page<Params> => {
    const homePage = AnaSayfaPageDef();
    const parentPage = TelefonVergisiPageDef();

    const id = "hesaplayici-telefon-preset";
    const title = preset.pageTitle;
    const url = siteUrl(`/telefon-vergisi-hesaplayici/${preset.slug}`);
    const ogImageUrl = staticSiteUrl(`/og/telefon-vergisi-${preset.slug}.jpg`);
    const breadcrumbs = [
        ...parentPage.breadcrumbs,
        { title: `${brand.title} ${preset.title}`, url }
    ];

    return {
        id,
        title,
        url,
        breadcrumbs,
        head: {
            title: `${title} - ${parentPage.title}`,
            description: preset.pageDescription,
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
                        "description": preset.pageDescription,
                        "isPartOf": { "@id": `${parentPage.url.href}#webapplication` },
                        "about": { "@id": `${homePage.url.href}#organization` },
                        "author": { "@id": `${homePage.url.href}#organization` },
                        "inLanguage": "tr-TR",
                        "applicationCategory": "FinanceApplication",
                        "operatingSystem": "All",
                        "browserRequirements": "Requires JavaScript. Requires HTML5.",
                        "softwareVersion": APP_VERSION,
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
        preset,
        brand
    };
};
