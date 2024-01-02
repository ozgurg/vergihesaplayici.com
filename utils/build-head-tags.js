/**
 * @param {object} args
 * @param {string} args.title
 * @param {string} args.description
 * @param {string} args.ogImageName
 * @returns {{title: string, meta: {hid: string, name: string, content: string|*}[]}}
 */
const buildHeadTags = ({
    title,
    description,
    ogImageName = "ana-sayfa.jpg"
}) => {
    const ogImage = require(`@/assets/og/${ogImageName}`);
    const ogImageUrl = process.env.APP_URL + ogImage;
    return {
        title,
        meta: [
            {
                hid: "title",
                name: "title",
                content: title
            },
            {
                hid: "description",
                name: "description",
                content: description
            },

            // Open Graph
            {
                property: "og:title",
                name: "og:title",
                content: title
            },
            {
                property: "og:site_name",
                name: "og:site_name",
                content: process.env.APP_NAME
            },
            {
                property: "og:description",
                name: "og:description",
                content: description
            },
            {
                property: "og:type",
                name: "og:type",
                content: "website"
            },
            {
                property: "og:image",
                name: "og:image",
                content: ogImageUrl
            },
            {
                property: "og:locale",
                name: "og:locale",
                content: "TR"
            },

            // X
            {
                name: "twitter:card",
                content: "summary_large_image"
            },
            {
                name: "twitter:title",
                content: title
            },
            {
                name: "twitter:description",
                content: description
            },
            {
                name: "twitter:image",
                content: ogImageUrl
            }
        ]
    };
};

export {
    buildHeadTags
};
