/**
 * @param {{[key: string]: any}} nuxtContentObject - https://content.nuxt.com/v1/getting-started/writing#front-matter
 * @return {Article}
 */
const _mapNuxtContentObjectAsArticle = nuxtContentObject => ({
    title: nuxtContentObject.title,
    slug: nuxtContentObject.slug,
    description: nuxtContentObject.description,
    nuxtContent: nuxtContentObject
});

/**
 * @param {string} slug
 * @param {*} $content
 * @return {Promise<Article>|null}
 */
const getArticleBySlug = async (slug, $content) => {
    const nuxtContent = await $content(slug).fetch();
    return nuxtContent ?
        _mapNuxtContentObjectAsArticle(nuxtContent) :
        null;
};

/**
 * @param {*} $content
 * @param {{limit?: number|null, where?: object|null}} options
 * @return {Promise<Article[]|[]>}
 */
const getAllArticles = async ($content, options = {
    limit: null,
    where: null
}) => {
    let nuxtContents = $content("/").sortBy("createdAt", "asc");

    if (options.limit !== null) {
        nuxtContents.limit(options.limit);
    }
    if (options.where !== null) {
        nuxtContents.where(options.where);
    }

    nuxtContents = await nuxtContents.fetch();

    return nuxtContents ?
        nuxtContents.map(_mapNuxtContentObjectAsArticle) :
        [];
};

export {
    getArticleBySlug,
    getAllArticles
};
