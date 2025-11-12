import type { Page, PageDef } from "@/types/page-def.js";
import { AnaSayfaPageDef } from "@/domains/ana-sayfa/page-def.js";
import type { Yazi } from "@/domains/yazilar/types";

export const YazilarPageDef: PageDef = (): Page => {
    const parentPage = AnaSayfaPageDef();

    const id = "yazilar";
    const title = "Yazılar";
    const url = siteUrl("/yazilar");
    const breadcrumbs = [
        ...parentPage.breadcrumbs,
        { title, url }
    ];

    return {
        id,
        title,
        url,
        breadcrumbs,
        head: {
            title,
            description: "Vergiler hakkında rehber ve güncel bilgiler için doğru adrestesiniz. Makalelerimiz ve ipuçlarımızla vergi yükümlülüklerinizi kolayca anlayın.",
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

    const id = "yazilar-slug";
    const title = yazi.title;
    const url = siteUrl(`/yazilar/${yazi.slug}`);
    const breadcrumbs = [
        ...parentPage.breadcrumbs,
        { title, url }
    ];

    return {
        id,
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
