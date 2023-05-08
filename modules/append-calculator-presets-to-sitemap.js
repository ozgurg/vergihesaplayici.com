/**
 * @class
 */
export default function AppendCalculatorPresetsToSitemap() {
    this.nuxt.hook("generate:done", generator => {
        this.nuxt.options.sitemap.routes = [
            ...generator.generatedRoutes
        ].filter(route => {
            return route.match(/(\/telefon-vergisi-hesaplayici\/(.*)\/)/) ||
                route.match(/(\/konsol-vergisi-hesaplayici\/(.*)\/)/);
        }).map(url => ({
            url,
            changefreq: "daily",
            priority: 0.9
        }));
    });
}
