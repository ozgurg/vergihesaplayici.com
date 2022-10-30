import { buildHeadTags } from "@/utils/build-head-tags.js";

const AnaSayfa = (() => {
    const title = "Vergi Hesaplayıcı";
    const description = "Türkiye'de telefon ve oyun konsolu gibi farklı ürün gruplarının yurt içi ve yurt dışı fiyatlarına ne kadar vergi uygulandığını hesaplayın.";
    const url = "/";
    const head = {
        titleTemplate: null,
        ...buildHeadTags({
            title,
            description,
            ogImageName: "ana-sayfa.jpg"
        })
    };

    return {
        title,
        description,
        url,
        head
    };
})();

export {
    AnaSayfa
};
