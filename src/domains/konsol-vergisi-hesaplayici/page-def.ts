import type { CalculatorPage, CalculatorPageDef, Page } from "@/types/page-def.js";
import type { Brand, Preset } from "@/domains/konsol-vergisi-hesaplayici/types.js";
import { icon_konsolVergisiHesaplayici as icon } from "@/utils/icons.js";
import { HesaplayicilarPageDef } from "@/domains/hesaplayicilar/page-def.js";

export const KonsolVergisiHesaplayiciPageDef: CalculatorPageDef = (): CalculatorPage => {
    const parentPage = HesaplayicilarPageDef();

    const id = "hesaplayici-konsol";
    const title = "Konsol Vergisi Hesaplayıcı";
    const shortTitle = "Konsol";
    const url = siteUrl("/konsol-vergisi-hesaplayici");
    const ogImageUrl = staticSiteUrl("/og/konsol-vergisi-hesaplayici.jpg");
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
            title: `${title} - %site-title%`,
            description: "Satın aldığınız bir oyun konsolunun yurt içi ve yurt dışı fiyatlarına ne kadar vergi uygulandığını hesaplayın.",
            canonicalUrl: url,
            ogImageUrl,
            schema: {
                "@context": "https://schema.org",
                "@type": "WebApplication",
                name: title,
                description: "Satın aldığınız bir oyun konsolunun yurt içi ve yurt dışı fiyatlarına ne kadar vergi uygulandığını hesaplayın.",
                applicationCategory: "BusinessApplication",
                operatingSystem: "All",
                url: url.href,
                offers: {
                    "@type": "Offer",
                    price: "0",
                    priceCurrency: "TRY"
                }
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

type _Params = {
    preset: Preset;
    brand: Brand;
};
type _PageDef = (params: _Params) => Page;
export const KonsolVergisiHesaplayiciPresetSlugPageDef: _PageDef = ({ preset, brand }): Page => {
    const parentPage = KonsolVergisiHesaplayiciPageDef();

    const id = "hesaplayici-konsol-preset";
    const title = preset.pageTitle;
    const url = siteUrl(`/konsol-vergisi-hesaplayici/${preset.slug}`);
    const ogImageUrl = staticSiteUrl(`/og/konsol-vergisi-hesaplayici-${preset.slug}.jpg`);
    const breadcrumbs = [
        ...parentPage.breadcrumbs,
        { title: brand.title, url: parentPage.url },
        { title: preset.title, url }
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
                "@type": "WebApplication",
                name: title,
                description: preset.pageDescription,
                applicationCategory: "BusinessApplication",
                operatingSystem: "All",
                url: url.href,
                offers: {
                    "@type": "Offer",
                    price: "0",
                    priceCurrency: "TRY"
                }
            }
        }
    };
};
