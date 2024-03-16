import { mdiController } from "@mdi/js";
import { HesaplayicilarPageDef } from "@/domain/hesaplayicilar/index.page-def.js";
import { buildHeadTags } from "@/utils/build-head-tags.js";

const parentPage = HesaplayicilarPageDef();

/** @type {CalculatorPageDef} */
const KonsolVergisiHesaplayiciPageDef = () => {
    const title = "Konsol Vergisi Hesaplayıcı";
    const url = "/konsol-vergisi-hesaplayici/";
    const breadcrumbs = [
        ...parentPage.breadcrumbs,
        {
            title,
            url
        }
    ];
    const head = buildHeadTags({
        title,
        description: "Satın aldığınız bir oyun konsolunun yurt içi ve yurt dışı fiyatlarına ne kadar vergi uygulandığını hesaplayın.",
        ogImage: "konsol-vergisi-hesaplayici/og/konsol-vergisi-hesaplayici.jpg"
    });

    return {
        title,
        url,
        breadcrumbs,
        head,
        icon: mdiController,
        shortTitle: "Konsol Vergisi",
        summary: "- Oyun oynamak hiç bu kadar vergili olmamıştı.<br />+ Meydan okuma kabul edildi."
    };
};

export {
    KonsolVergisiHesaplayiciPageDef
};
