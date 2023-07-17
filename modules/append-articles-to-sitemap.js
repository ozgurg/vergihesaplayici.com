/**
 * @class
 */
export default function AppendArticlesToSitemap() {
    this.nuxt.hook("generate:done", async generator => {
        const { $content } = require("@nuxt/content");
        const articles = await $content({ deep: true }).only(["path"]).fetch();

        this.nuxt.options.sitemap.routes = [
            ...this.nuxt.options.sitemap.routes,
            ...articles.map(({ path }) => ({
                url: `/yazilar/${path}/`,
                changefreq: "weekly",
                priority: 0.8
            }))
        ];
    });
}
