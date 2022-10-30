import { mdiController } from "@mdi/js";
import { buildHeadTags } from "@/utils/build-head-tags.js";
import Hesaplayicilar from "@/data/pages/Hesaplayicilar.js";

export default (() => {
    const icon = mdiController;
    const title = "Konsol Vergisi Hesaplayıcı";
    const shortTitle = "Konsol Vergisi";
    const description = "Satın aldığınız bir oyun konsolunun yurt içi ve yurt dışı fiyatlarına ne kadar vergi uygulandığını hesaplayın.";
    const url = "/hesaplayicilar/konsol-vergisi-hesaplayici/";
    const head = buildHeadTags({
        title,
        description,
        ogImageName: "konsol-vergisi-hesaplayici.jpg"
    });
    const breadcrumbs = [
        ...Hesaplayicilar.breadcrumbs,
        { title, url }
    ];
    const summary = "- Oyun oynamak hiç bu kadar vergili olmamıştı.<br />+ Meydan okuma kabul edildi.";

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
