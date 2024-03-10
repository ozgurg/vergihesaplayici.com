import { AnaSayfaPageDef } from "@/domain/ana-sayfa/index.page-def.js";
import { buildHeadTags } from "@/utils/build-head-tags.js";

const parentPage = AnaSayfaPageDef();

/** @type {PageDef} */
const YazilarPageDef = () => {
    const title = "Yazılar";
    const url = "/yazilar/";
    const breadcrumbs = [
        ...parentPage.breadcrumbs,
        {
            title,
            url
        }
    ];
    const head = buildHeadTags({
        title,
        description: "Vergiler hakkında bilgi edinmek ve güncel vergi kanunlarına dair rehber arıyorsanız, doğru adrestesiniz! Vergilerle ilgili tüm detayları içeren kapsamlı makalelerimiz ve vergi ipuçlarımızla size yol gösteriyoruz. Vergi dünyasında kendinizi güvende hissetmek ve vergi yükümlülüklerinizi anlamak için sayfamızı keşfedin."
    });

    return {
        title,
        url,
        breadcrumbs,
        head
    };
};

export {
    YazilarPageDef
};
