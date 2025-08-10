import type { CalculatorPage, CalculatorPageDef, Page } from "@/types/page-def.js";
import type { Preset } from "@/domains/telefon-vergisi-hesaplayici/types.js";
import { icon_telefonVergisiHesaplayici as icon } from "@/utils/icons.js";
import { HesaplayicilarPageDef } from "@/domains/hesaplayicilar/page-def.js";

export const TelefonVergisiHesaplayiciPageDef: CalculatorPageDef = (): CalculatorPage => {
    const parentPage = HesaplayicilarPageDef();

    const title = "Telefon Vergisi Hesaplayıcı";
    const shortTitle = "Telefon";
    const url = siteUrl("/telefon-vergisi-hesaplayici");
    const ogImageUrl = staticSiteUrl("/og/telefon-vergisi-hesaplayici.jpg");
    const breadcrumbs = [
        ...parentPage.breadcrumbs,
        { title, url }
    ];

    return {
        title,
        shortTitle,
        url,
        breadcrumbs,
        icon,
        head: {
            title,
            description: "Bir telefonun vergisini hesaplamak için başta ÖTV gibi tüm telefon vergilerini hesaplama yeteneğine sahip Telefon Vergisi Hesaplayıcı aracını kullanın. Vergilerin ne kadar uygulandığını ve vergisiz telefon fiyatını öğrenin. Yurt içi ve yurt dışı fiyatlarını karşılaştırın.",
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
};
type _PageDef = (params: _Params) => Page;
export const TelefonVergisiHesaplayiciPresetSlugPageDef: _PageDef = ({ preset }): Page => {
    const parentPage = TelefonVergisiHesaplayiciPageDef();

    const title = preset.pageTitle;
    const url = siteUrl(`/telefon-vergisi-hesaplayici/${preset.slug}`);
    const ogImageUrl = staticSiteUrl(`/og/telefon-vergisi-hesaplayici-${preset.slug}.jpg`);
    const breadcrumbs = [
        ...parentPage.breadcrumbs,
        { title, url }
    ];

    return {
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
