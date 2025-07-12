import type { Page, PageDef } from "@/types/page-def.js";
import { AnaSayfaPageDef } from "@/domains/ana-sayfa/page-def.js";
import type { Yazi } from "@/domains/yazilar/types";

export const YazilarPageDef: PageDef = (): Page => {
    const parentPage = AnaSayfaPageDef();

    const title = "Yazılar";
    const url = siteUrl("/yazilar");
    const breadcrumbs = [
        ...parentPage.breadcrumbs,
        { title, url }
    ];

    return {
        title,
        url,
        breadcrumbs,
        head: {
            title,
            description: "Vergiler hakkında bilgi edinmek ve güncel vergi kanunlarına dair rehber arıyorsanız, doğru adrestesiniz! Vergilerle ilgili tüm detayları içeren kapsamlı makalelerimiz ve vergi ipuçlarımızla size yol gösteriyoruz. Vergi dünyasında kendinizi güvende hissetmek ve vergi yükümlülüklerinizi anlamak için sayfamızı keşfedin.",
            canonicalUrl: url,
            ogImageUrl: null
        }
    };
};

type _Params = {
    yazi: Yazi;
};
type _PageDef = (params: _Params) => Page;
export const YazilarSlugPageDef: _PageDef = ({ yazi }): Page => {
    const parentPage = YazilarPageDef();

    const title = yazi.title;
    const url = siteUrl(`/yazilar/${yazi.slug}`);
    const breadcrumbs = [
        ...parentPage.breadcrumbs,
        { title, url }
    ];

    return {
        title,
        url,
        breadcrumbs,
        head: {
            title,
            description: yazi.description,
            canonicalUrl: url,
            ogImageUrl: null
        }
    };
};
