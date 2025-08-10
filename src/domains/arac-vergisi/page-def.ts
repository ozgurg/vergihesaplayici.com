import type { CalculatorPage, CalculatorPageDef } from "@/types/page-def.js";
import { icon_aracVergisi as icon } from "@/utils/icons.js";
import { HesaplayicilarPageDef } from "@/domains/hesaplayicilar/page-def.js";

export const AracVergisiPageDef: CalculatorPageDef = (): CalculatorPage => {
    const parentPage = HesaplayicilarPageDef();

    const title = "Araç Vergisi Hesaplayıcı";
    const shortTitle = "Araç";
    const url = siteUrl("/arac-vergisi");
    const ogImageUrl = staticSiteUrl("/og/arac-vergisi.jpg");
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
            description: "Sıfır araç fiyatına göre ÖTV ve KDV tutarını hesaplayın. Araç vergisi hesaplama aracı ile 2025'te toplam maliyeti anında görün.",
            canonicalUrl: url,
            ogImageUrl
        },
        //language=HTML
        summary: "Biz en iyisi halıda oyuncak arabayla vınn-vınn yapalım"
    };
};
