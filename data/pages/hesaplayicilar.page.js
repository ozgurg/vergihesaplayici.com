import { buildHeadTags } from "@/utils/build-head-tags.js";

export default (() => {
    const title = "Hesaplayıcılar";
    const description = "Telefon ve oyun konsolu gibi farklı ürün gruplarının yurt içi ve yurt dışı fiyatlarına Türkiye'de ne kadar vergi uygulandığını hesaplayın.";
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
