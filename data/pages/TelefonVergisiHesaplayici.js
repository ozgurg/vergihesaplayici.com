import { mdiCellphone } from "@mdi/js";
import { buildHeadTags } from "@/utils/build-head-tags.js";
import Hesaplayicilar from "@/data/pages/Hesaplayicilar.js";

export default (() => {
    const icon = mdiCellphone;
    const title = "Telefon Vergisi Hesaplayıcı";
    const shortTitle = "Telefon Vergisi";
    const description = "Satın aldığınız bir telefonun yurt içi ve yurt dışı fiyatlarına ne kadar vergi uygulandığını hesaplayın.";
    const url = "/hesaplayicilar/telefon-vergisi-hesaplayici/";
    const head = buildHeadTags({
        title,
        description,
        ogImageName: "telefon-vergisi-hesaplayici.jpg"
    });
    const breadcrumbs = [
        ...Hesaplayicilar.breadcrumbs,
        { title, url }
    ];
    const summary = "\"O ney vatandaş, bir tane de bana ver\"<br /><i>- Vergili Mıçı</i>";

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
