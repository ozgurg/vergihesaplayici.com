/**
 * @param {object} head
 * @param {string} head.title
 * @param {string} head.description
 * @param {string} head.ogImageName
 * @returns {{title: string, meta: {hid?: string, name: string, content: *}[]}}
 */
const buildHeadTags = ({
    title,
    description,
    ogImageName
}) => {
    const ogImage = require(`@/assets/img/og/${ogImageName}`);
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
                name: "og:title",
                content: title
            },
            {
                name: "og:site_name",
                content: process.env.APP_NAME
            },
            {
                name: "og:description",
                content: description
            },
            {
                name: "og:type",
                content: "website"
            },
            {
                name: "og:image",
                content: ogImage
            },
            {
                name: "og:locale",
                content: "TR"
            },

            // Twitter
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
                content: ogImage
            }
        ]
    };
};

export {
    buildHeadTags
};
