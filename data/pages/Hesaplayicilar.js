import { buildHeadTags } from "@/utils/build-head-tags.js";

const Hesaplayicilar = (() => {
    const title = "Hesaplayıcılar";
    const description = "Türkiye'de telefon ve oyun konsolu gibi farklı ürün gruplarının yurt içi ve yurt dışı fiyatlarına ne kadar vergi uygulandığını hesaplayın.";
    const url = "/hesaplayicilar/";
    const head = buildHeadTags({
        title,
        description,
        ogImageName: "ana-sayfa.jpg"
    });
    const breadcrumbs = [
        { title, url }
    ];

    return {
        title,
        description,
        url,
        head,
        breadcrumbs
    };
})();

export {
    Hesaplayicilar
};
