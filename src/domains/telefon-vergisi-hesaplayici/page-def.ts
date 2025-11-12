import type { CalculatorPage, CalculatorPageDef, Page } from "@/types/page-def.js";
import type { Brand, Preset } from "@/domains/telefon-vergisi-hesaplayici/types.js";
import { icon_telefonVergisiHesaplayici as icon } from "@/utils/icons.js";
import { HesaplayicilarPageDef } from "@/domains/hesaplayicilar/page-def.js";

export const TelefonVergisiHesaplayiciPageDef: CalculatorPageDef = (): CalculatorPage => {
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
            title,
            description: "Telefon Vergisi Hesaplayıcı ile ÖTV dahil tüm vergileri hesaplayın, vergisiz fiyatı görün ve yurt içi-yurt dışı fiyatları karşılaştırın.",
            canonicalUrl: url,
            ogImageUrl
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
type _PageDef = (params: _Params) => Page;
export const TelefonVergisiHesaplayiciPresetSlugPageDef: _PageDef = ({ preset, brand }): Page => {
    const parentPage = TelefonVergisiHesaplayiciPageDef();

    const id = "hesaplayici-telefon-preset";
    const title = preset.pageTitle;
    const url = siteUrl(`/telefon-vergisi-hesaplayici/${preset.slug}`);
    const ogImageUrl = staticSiteUrl(`/og/telefon-vergisi-hesaplayici-${preset.slug}.jpg`);
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
            title,
            description: preset.pageDescription,
            canonicalUrl: url,
            ogImageUrl
        }
    };
};
