import type { CalculatorPage, Page } from "@/types/page-def.js";
import type { Brand, Preset } from "@/domains/telefon-vergisi-hesaplayici/types.js";
import { icon_telefonVergisiHesaplayici as icon } from "@/utils/icons.js";
import { HesaplayicilarPageDef } from "@/domains/hesaplayicilar/page-def.js";
import { AnaSayfaPageDef } from "@/domains/ana-sayfa/page-def";

export const TelefonVergisiHesaplayiciPageDef = (): CalculatorPage => {
    const homePage = AnaSayfaPageDef();
    const parentPage = HesaplayicilarPageDef();

    const id = "hesaplayici-telefon";
    const title = "Telefon Vergisi Hesaplayıcı";
    const shortTitle = "Telefon";
    const url = siteUrl("/telefon-vergisi-hesaplayici");
    const ogImageUrl = staticSiteUrl("/og/telefon-vergisi-hesaplayici.jpg");
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
            description: "Telefon Vergisi Hesaplayıcı ile ÖTV dahil tüm vergileri hesaplayın, vergisiz fiyatı görün ve yurt içi-yurt dışı fiyatları karşılaştırın.",
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
            "O ney vatandaş, 1.03 tane de bana ver."
            <br />
            <em>– Vergili Mıçı</em>
        `
    };
};

type _Params = {
    preset: Preset;
    brand: Brand;
};
export const TelefonVergisiHesaplayiciPresetSlugPageDef = ({ preset, brand }: _Params): Page => {
    const homePage = AnaSayfaPageDef();
    const parentPage = TelefonVergisiHesaplayiciPageDef();

    const id = "hesaplayici-telefon-preset";
    const title = preset.pageTitle;
    const url = siteUrl(`/telefon-vergisi-hesaplayici/${preset.slug}`);
    const ogImageUrl = staticSiteUrl(`/og/telefon-vergisi-hesaplayici-${preset.slug}.jpg`);
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
        }
    };
};
