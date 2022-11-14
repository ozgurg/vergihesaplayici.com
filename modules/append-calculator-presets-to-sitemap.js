/**
 * @class
 */
export default function AppendCalculatorPresetsToSitemap() {
    this.nuxt.hook("generate:done", generator => {
        const generatedRoutes = [...generator.generatedRoutes]; // "generatedRoutes" is a Set. We convert it to an array.
        this.nuxt.options.sitemap.routes = generatedRoutes
            .filter(route => {
                return route.match(/(\/telefon-vergisi-hesaplayici\/(.*)\/)/) ||
                    route.match(/(\/konsol-vergisi-hesaplayici\/(.*)\/)/);
            })
            .map(url => ({
                url,
                changefreq: "daily",
                priority: 0.9
            }));
    });
}
