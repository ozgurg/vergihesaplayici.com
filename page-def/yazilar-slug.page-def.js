import { YazilarPageDef } from "@/page-def/yazilar.page-def.js";
import { buildHeadTags } from "@/utils/build-head-tags.js";

const parentPage = YazilarPageDef();

/**
 * @param {{[key: string]: any}} nuxtContentObject
 * @return {Article}
 */
const mapNuxtContentObjectAsArticle = nuxtContentObject => ({
    title: nuxtContentObject.title,
    slug: nuxtContentObject.slug,
    description: nuxtContentObject.description
});

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
    mapNuxtContentObjectAsArticle,
    YazilarSlugPageDef
};
