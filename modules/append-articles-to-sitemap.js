/**
 *
 */
export default function AppendArticlesToSitemap() {
    this.nuxt.hook("generate:done", async generator => {
        const { $content } = require("@nuxt/content");
        const articles = await $content({ deep: true }).only(["path"]).fetch();

        const generatedRoutes = [...generator.generatedRoutes, ...articles]; // "generatedRoutes" is a Set. We convert it to an array.
        this.nuxt.options.sitemap.routes = generatedRoutes
            .map(url => ({
                url,
                changefreq: "daily",
                priority: 0.8
            }));
    });
}
