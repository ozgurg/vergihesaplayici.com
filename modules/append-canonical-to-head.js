// @ alias is not working
import { getFullUrl } from "./../utils/get-full-url.js";

/**
 * @class
 */
export default function AppendCanonicalToHead() {
    this.nuxt.hook("generate:page", page => {
        const fullUrl = getFullUrl(page.route);

        const canonical = `
            <link rel="canonical" href="${fullUrl}" />
            <meta property="og:url" content="${fullUrl}" />
            <link rel="alternate" hreflang="x-default" href="${fullUrl}" />
            <link rel="alternate" hreflang="tr" href="${fullUrl}" />
        `;

        page.html = page.html.replace("</head>", `${canonical}</head>`);
    });
}
