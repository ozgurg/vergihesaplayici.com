// @ alias is not working
import * as cheerio from "cheerio";
import { getFullUrl } from "./../utils/get-full-url.js";

/**
 * @class
 */
export default function AppendCanonicalToHead() {
    this.nuxt.hook("generate:page", page => {
        // Inspired by https://github.com/littlegiants/nuxt-canonical

        const $ = cheerio.load(page.html);
        const head = $("head");

        const fullUrl = getFullUrl(page.route);

        head.append(`<link rel="canonical" href="${fullUrl}" />`);

        head.append(`<meta property="og:url" content="${fullUrl}" />`);

        head.append(`<link rel="alternate" hreflang="x-default" href="${fullUrl}" />`);
        head.append(`<link rel="alternate" hreflang="tr" href="${fullUrl}" />`);

        page.html = $.html();
    });
}
