import { AnaSayfaPageDef } from "@/domain/ana-sayfa/index.page-def.js";
import { buildHeadTags } from "@/utils/build-head-tags.js";

const parentPage = AnaSayfaPageDef();

/** @type {PageDef} */
const HesaplayicilarPageDef = () => {
    const title = "Hesaplayıcılar";
    const url = "/hesaplayicilar/";
    const breadcrumbs = [
        ...parentPage.breadcrumbs,
        {
            title,
            url
        }
    ];
    const head = buildHeadTags({
        title,
        description: "Telefon ve oyun konsolu gibi farklı ürün gruplarının yurt içi ve yurt dışı fiyatlarına Türkiye'de ne kadar vergi uygulandığını hesaplayın."
    });

    return {
        title,
        url,
        breadcrumbs,
        head
    };
};

export {
    HesaplayicilarPageDef
};
