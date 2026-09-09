import type { APIRoute } from "astro";
import rss from "@astrojs/rss";
import { getYazilar } from "@/domains/yazilar/db.js";
import { siteUrl } from "@/utils/url.js";
import { YazilarSlugPageDef } from "@/domains/yazilar/page-def.js";

export const GET: APIRoute = async (context): Promise<Response> => {
    const yazilar = await getYazilar();

    return rss({
        title: "Vergi Hesaplayıcı",
        description: "Türkiye'nin güncel vergi hesaplama ve mevzuat platformu. Vergi türleri, beyannameler, oranlar ve rehberler.",
        site: context.site ?? siteUrl(),
        items: yazilar.map(_yazi => {
            const yazilarSlugPage = YazilarSlugPageDef({ yazi: _yazi });
            return {
                title: _yazi.title,
                description: _yazi.description,
                pubDate: _yazi.updatedDate ?? _yazi.createdDate,
                link: yazilarSlugPage.url.href
            };
        }),
        customData: "<language>tr-tr</language>"
    });
};
