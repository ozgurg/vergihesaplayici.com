import type { Yazi } from "@/domains/yazilar/types.js";
import type { Props as ArticlesGridProps } from "@/components/articles-grid.vue";
import { YazilarSlugPageDef } from "@/domains/yazilar/page-def.js";

export const mapYazilarForArticlesGridComponent = (yazilar: Yazi[]): ArticlesGridProps["items"] => {
    return yazilar.map(_yazi => {
        const yazilarSlugPage = YazilarSlugPageDef({ yazi: _yazi });
        return {
            title: yazilarSlugPage.title,
            description: _yazi.description,
            url: yazilarSlugPage.url,
            date: _yazi.date
        };
    });
};
