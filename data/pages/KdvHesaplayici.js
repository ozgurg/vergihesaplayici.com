import { mdiBrightnessPercent } from "@mdi/js";
import { buildHeadTags } from "@/utils/build-head-tags.js";
import Hesaplayicilar from "@/data/pages/Hesaplayicilar.js";

export default (() => {
    const icon = mdiBrightnessPercent;
    const title = "KDV Hesaplayıcı";
    const shortTitle = "Katma Değer Vergisi";
    const description = "Namıdiğer her şeyin vergisini hariç ve dahil olarak hesaplayın.";
    const url = "/hesaplayicilar/kdv-hesaplayici/";
    const head = buildHeadTags({
        title,
        description,
        ogImageName: "kdv-hesaplayici.jpg"
    });
    const breadcrumbs = [
        ...Hesaplayicilar.breadcrumbs,
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
