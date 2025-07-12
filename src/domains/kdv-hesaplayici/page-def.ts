import type { CalculatorPage, CalculatorPageDef } from "@/types/page-def.js";
import { icon_kdvHesaplayici as icon } from "@/utils/icons.js";
import { HesaplayicilarPageDef } from "@/domains/hesaplayicilar/page-def.js";

export const KdvHesaplayiciPageDef: CalculatorPageDef = (): CalculatorPage => {
    const parentPage = HesaplayicilarPageDef();

    const title = "KDV Hesaplayıcı";
    const shortTitle = "KDV";
    const url = siteUrl("/kdv-hesaplayici");
    const ogImageUrl = staticSiteUrl("/og/kdv-hesaplayici.jpg");
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
            description: "Katma Değer Vergisi (KDV) Hesaplayıcı aracını KDV hariç fiyattan KDV dahil fiyatı veya KDV dahil fiyattan KDV hariç fiyatı hesaplamak için kullanabilirsiniz.",
            canonicalUrl: url,
            ogImageUrl
        },
        //language=HTML
        summary: `
            "Her şey değerlidir"
            <br />
            <em>– Katma Değer</em>
        `
    };
};
