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
    const description = "Bir telefonun vergisini hesaplamak için başta ÖTV gibi tüm telefon vergilerini hesaplama yeteneğine sahip Telefon Vergisi Hesaplayıcı aracını kullanın. Vergilerin ne kadar uygulandığını ve vergisiz telefon fiyatını öğrenin. Yurt içi ve yurt dışı fiyatlarını karşılaştırın.";
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
    const summary = "\"O ney vatandaş, 1.03 tane de bana ver\"<br /><i>- Vergili Mıçı</i>";

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
