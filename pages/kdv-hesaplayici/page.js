import { mdiBrightnessPercent } from "@mdi/js";
import { Mode } from "./Calculator.js";
import { buildHeadTags } from "@/utils/build-head-tags.js";
import parentPage from "@/pages/hesaplayicilar/page.js";

const modeOptions = [
    {
        title: "KDV hariç fiyattan KDV dahil fiyatı hesapla",
        value: Mode.TaxFreePriceToTaxAddedPrice
    },
    {
        title: "KDV dahil fiyattan KDV hariç fiyatı hesapla",
        value: Mode.TaxAddedPriceToTaxFreePrice
    }
];

export default (() => {
    const icon = mdiBrightnessPercent;
    const title = "KDV Hesaplayıcı";
    const shortTitle = "Katma Değer Vergisi";
    const description = "Namıdiğer her şeyin vergisini hariç ve dahil olarak hesaplayın.";
    const url = "/kdv-hesaplayici/";
    const head = buildHeadTags({
        title,
        description,
        ogImageName: "kdv-hesaplayici.jpg"
    });
    const breadcrumbs = [
        ...parentPage.breadcrumbs,
        { title, url }
    ];
    const summary = "\"Her şey değerlidir.\"<br /><i>- Katma Değer</i>";

    return {
        icon,
        title,
        shortTitle,
        description,
        url,
        head,
        breadcrumbs,
        summary
    };
})();

export {
    modeOptions
};
