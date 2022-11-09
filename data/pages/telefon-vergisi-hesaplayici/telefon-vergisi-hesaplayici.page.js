import { mdiCellphone } from "@mdi/js";
import { Registration } from "@/data/pages/telefon-vergisi-hesaplayici/telefon-vergisi-hesaplayici.calculator.js";
import { buildHeadTags } from "@/utils/build-head-tags.js";
import parentPage from "@/data/pages/hesaplayicilar.page.js";

const registrationOptions = [
    {
        title: "İthalat ile",
        description: "İthalatçıların ithal edip sattığı ürünlerdir.",
        value: Registration.Import
    },
    {
        title: "Pasaport ile",
        description: "Yurt dışına giden kişinin yanında getirip kayıt ettirdiği ürünlerdir.",
        value: Registration.Passport
    }
];

export default (() => {
    const icon = mdiCellphone;
    const title = "Telefon Vergisi Hesaplayıcı";
    const shortTitle = "Telefon Vergisi";
    const description = "Satın aldığınız bir telefonun yurt içi ve yurt dışı fiyatlarına ne kadar vergi uygulandığını hesaplayın.";
    const url = "/telefon-vergisi-hesaplayici/";
    const head = buildHeadTags({
        title,
        description,
        ogImageName: "telefon-vergisi-hesaplayici.jpg"
    });
    const breadcrumbs = [
        ...parentPage.breadcrumbs,
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

export {
    registrationOptions
};
