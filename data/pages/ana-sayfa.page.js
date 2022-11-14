import { buildHeadTags } from "@/utils/build-head-tags.js";

export default (() => {
    const title = "Vergi Hesaplayıcı";
    const description = "Telefon ve oyun konsolu gibi farklı ürün gruplarının yurt içi ve yurt dışı fiyatlarına Türkiye'de ne kadar vergi uygulandığını hesaplayın.";
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
