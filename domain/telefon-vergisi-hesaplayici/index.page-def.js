import { mdiCellphone } from "@mdi/js";
import { HesaplayicilarPageDef } from "@/domain/hesaplayicilar/index.page-def.js";
import { buildHeadTags } from "@/utils/build-head-tags.js";

const parentPage = HesaplayicilarPageDef();

/** @type {CalculatorPageDef} */
const TelefonVergisiHesaplayiciPageDef = () => {
    const title = "Telefon Vergisi Hesaplayıc";
    const url = "/telefon-vergisi-hesaplayici/";
    const breadcrumbs = [
        ...parentPage.breadcrumbs,
        {
            title,
            url
        }
    ];
    const head = buildHeadTags({
        title,
        description: "Bir telefonun vergisini hesaplamak için başta ÖTV gibi tüm telefon vergilerini hesaplama yeteneğine sahip Telefon Vergisi Hesaplayıcı aracını kullanın. Vergilerin ne kadar uygulandığını ve vergisiz telefon fiyatını öğrenin. Yurt içi ve yurt dışı fiyatlarını karşılaştırın.",
        ogImage: "telefon-vergisi-hesaplayici/og/telefon-vergisi-hesaplayici.jpg"
    });

    return {
        title,
        url,
        breadcrumbs,
        head,
        icon: mdiCellphone,
        shortTitle: "Telefon Vergisi",
        summary: "\"O ney vatandaş, 1.03 tane de bana ver\"<br /><i>- Vergili Mıçı</i>"
    };
};

export {
    TelefonVergisiHesaplayiciPageDef
};
