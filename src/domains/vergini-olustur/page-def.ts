import type { CalculatorPage, CalculatorPageDef } from "@/types/page-def.js";
import { icon_verginiOlustur as icon } from "@/utils/icons.js";
import { HesaplayicilarPageDef } from "@/domains/hesaplayicilar/page-def.js";

export const VerginiOlusturPageDef: CalculatorPageDef = (): CalculatorPage => {
    const parentPage = HesaplayicilarPageDef();

    const title = "Vergini Oluştur";
    const shortTitle = title;
    const url = siteUrl("/vergini-olustur");
    const ogImageUrl = staticSiteUrl("/og/vergini-olustur.jpg");
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
            description: "Vergi ödeyenden koyucuya (vergi) terfi ettiren hesap makinesi.",
            canonicalUrl: url,
            ogImageUrl
        },
        //language=HTML
        summary: "Ekonomist olmak hiç bu kadar kolay olmamıştı (Yoksa oldu mu? 🤔)"
    };
};
