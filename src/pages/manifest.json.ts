import type { APIRoute } from "astro";
import { AnaSayfaPageDef } from "@/domains/ana-sayfa/page-def.js";
import { staticUrl } from "@/utils/url.js";

const anaSayfaPage = AnaSayfaPageDef();

export const GET: APIRoute = (): Response => {
    const body = JSON.stringify({
        display: "fullscreen",
        display_override: ["tabbed", "window-controls-overlay"],
        orientation: "portrait",

        id: "?manifest=true",
        start_url: `${anaSayfaPage.url.href}?manifest=true`,

        name: "Vergi Hesaplayıcı",
        short_name: "Vergi Hesaplayıcı",
        description: "Vergi Hesaplayıcı, vergi hesaplar.",

        background_color: "#111",
        theme_color: "#88df95",

        icons: [
            {
                purpose: "maskable",
                sizes: "1462x1462",
                src: staticUrl("/pwa/icon-maskable.png"),
                type: "image/png"
            },
            {
                purpose: "any",
                sizes: "144x144",
                src: staticUrl("/pwa/icon-any.png"),
                type: "image/png"
            }
        ],

        screenshots: [
            {
                sizes: "320x320",
                src: staticUrl("/pwa/screenshot-narrow.png"),
                type: "image/png",
                form_factor: "narrow"
            },
            {
                sizes: "320x320",
                src: staticUrl("/pwa/screenshot-wide.png"),
                type: "image/png",
                form_factor: "wide"
            }
        ]
    });
    return new Response(body, {
        headers: {
            "Content-Type": "application/json"
        }
    });
};
