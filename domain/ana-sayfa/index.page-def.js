import { buildHeadTags } from "@/utils/build-head-tags.js";

/** @type {PageDef} */
const AnaSayfaPageDef = () => {
    const title = "Vergi Hesaplayıcı";
    const url = "/";
    const breadcrumbs = [
        {
            title: "Ana Sayfa",
            url
        }
    ];
    const head = {
        titleTemplate: null,
        ...buildHeadTags({
            title,
            description: "Telefon ve oyun konsolu gibi farklı ürün gruplarının yurt içi ve yurt dışı fiyatlarına Türkiye'de ne kadar vergi uygulandığını hesaplayın.",
            ogImage: "ana-sayfa/og/ana-sayfa.jpg"
        })
    };

    return {
        title,
        url,
        breadcrumbs,
        head
    };
};

export {
    AnaSayfaPageDef
};
