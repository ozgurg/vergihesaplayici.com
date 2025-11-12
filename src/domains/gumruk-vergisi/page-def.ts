import type { CalculatorPage, CalculatorPageDef } from "@/types/page-def.js";
import { icon_gumrukVergisi as icon } from "@/utils/icons.js";
import { HesaplayicilarPageDef } from "@/domains/hesaplayicilar/page-def.js";

export const GumrukVergisiPageDef: CalculatorPageDef = (): CalculatorPage => {
    const parentPage = HesaplayicilarPageDef();

    const id = "hesaplayici-gumruk";
    const title = "Gümrük Vergisi Hesaplayıcı";
    const shortTitle = "Gümrük";
    const url = siteUrl("/gumruk-vergisi");
    const ogImageUrl = staticSiteUrl("/og/gumruk-vergisi.jpg");
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
            description: "Yurt dışından gelen ürünler için ne kadar gümrük vergisi ödeyeceğinizi öğrenin. Gümrük Vergisi Hesaplayıcı ile hızlı ve kolay şekilde vergi tutarını hesaplayın.",
            canonicalUrl: url,
            ogImageUrl
        },
        //language=HTML
        summary: "Girebiliyor ama ne pahasına?"
    };
};
