import { mdiBrightnessPercent } from "@mdi/js";
import { HesaplayicilarPageDef } from "@/page-def/hesaplayicilar.page-def.js";
import { buildHeadTags } from "@/utils/build-head-tags.js";

const parentPage = HesaplayicilarPageDef();

/** @type {CalculatorPageDef} */
const KdvHesaplayiciPageDef = () => {
    const title = "KDV Hesaplayıcı";
    const url = "/kdv-hesaplayici/";
    const breadcrumbs = [
        ...parentPage.breadcrumbs,
        {
            title,
            url
        }
    ];
    const head = buildHeadTags({
        title,
        description: "Katma Değer Vergisi (KDV) Hesaplayıcı aracını KDV hariç fiyattan KDV dahil fiyatı veya KDV dahil fiyattan KDV hariç fiyatı hesaplamak için kullanabilirsiniz.",
        ogImageName: "kdv-hesaplayici.jpg"
    });

    return {
        title,
        url,
        breadcrumbs,
        head,
        icon: mdiBrightnessPercent,
        shortTitle: "Katma Değer Vergisi",
        summary: "\"Her şey değerlidir\"<br /><i>- Katma Değer</i>"
    };
};

export {
    KdvHesaplayiciPageDef
};
