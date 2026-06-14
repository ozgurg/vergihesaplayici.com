import type { CalculatorPage, Page } from "@/types/page-def.js";
import type { Brand, Preset } from "@/domains/konsol-vergisi/types.js";
import { icon_konsolVergisi as icon } from "@/utils/icons.js";
import { HesaplayicilarPageDef } from "@/domains/hesaplayicilar/page-def.js";
import { AnaSayfaPageDef } from "@/domains/ana-sayfa/page-def.js";

export const KonsolVergisiPageDef = (): CalculatorPage => {
    const homePage = AnaSayfaPageDef();
    const parentPage = HesaplayicilarPageDef();

    const id = "hesaplayici-konsol";
    const title = "Konsol Vergisi Hesaplayıcı";
    const shortTitle = "Konsol";
    const url = siteUrl("/konsol-vergisi-hesaplayici");
    const ogImageUrl = staticSiteUrl("/og/konsol-vergisi.jpg");
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
            description: "Satın aldığınız bir oyun konsolunun yurt içi ve yurt dışı fiyatlarına ne kadar vergi uygulandığını hesaplayın.",
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
        summary: `
            V: Oyun oynamak hiç bu kadar vergili olmamıştı.
            <br />
            D: Meydan okuma kabul edildi.
        `
    };
};

type Params = {
    preset: Preset;
    brand: Brand;
};
export const KonsolVergisiPresetSlugPageDef = ({ preset, brand }: Params): Page<Params> => {
    const homePage = AnaSayfaPageDef();
    const parentPage = KonsolVergisiPageDef();

    const id = "hesaplayici-konsol-preset";
    const title = preset.pageTitle;
    const url = siteUrl(`/konsol-vergisi-hesaplayici/${preset.slug}`);
    const ogImageUrl = staticSiteUrl(`/og/konsol-vergisi-${preset.slug}.jpg`);
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
                        "isPartOf": { "@id": `${parentPage.url.href}#webapplication` },
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
        preset,
        brand
    };
};
