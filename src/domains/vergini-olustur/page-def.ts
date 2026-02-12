import type { CalculatorPage, CalculatorPageDef } from "@/types/page-def.js";
import { icon_verginiOlustur as icon } from "@/utils/icons.js";
import { HesaplayicilarPageDef } from "@/domains/hesaplayicilar/page-def.js";

export const VerginiOlusturPageDef: CalculatorPageDef = (): CalculatorPage => {
    const parentPage = HesaplayicilarPageDef();

    const id = "hesaplayici-vergini-olustur";
    const title = "Vergini Oluştur";
    const shortTitle = title;
    const url = siteUrl("/vergini-olustur");
    const ogImageUrl = staticSiteUrl("/og/vergini-olustur.jpg");
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
            description: "Kendi vergi oranlarınızı ekleyip çıkararak net vergi miktarını hızlıca hesaplayabileceğiniz, pratik ve kullanıcı dostu bir vergi hesaplayıcı.",
            canonicalUrl: url,
            ogImageUrl
        },
        //language=HTML
        summary: "Ekonomist olmak hiç bu kadar kolay olmamıştı"
    };
};
