import { YazilarPageDef } from "@/domain/yazilar/index.page-def.js";
import { buildHeadTags } from "@/utils/build-head-tags.js";

const parentPage = YazilarPageDef();

/** @type {YazilarSlugPageDefinition} */
const YazilarSlugPageDef = article => {
    const title = article.title;
    const url = `${parentPage.url}${article.slug}/`;
    const breadcrumbs = [
        ...parentPage.breadcrumbs,
        {
            title,
            url
        }
    ];
    const head = buildHeadTags({
        title,
        description: article.description
    });

    return {
        title,
        url,
        breadcrumbs,
        head,
        description: article.description
    };
};

export {
    YazilarSlugPageDef
};
