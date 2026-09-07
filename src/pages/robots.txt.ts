import type { APIRoute } from "astro";

export const GET: APIRoute = (): Response => {
    const body = [
        "user-agent: *",
        "allow: /",
        "",
        `sitemap: ${staticSiteUrl("/sitemap-index.xml", false)}`
    ].join("\n");
    return new Response(body, {
        headers: {
            "Content-Type": "text/plain"
        }
    });
};
