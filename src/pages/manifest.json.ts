import type { APIRoute } from "astro";
import { AnaSayfaPageDef } from "@/domains/ana-sayfa/page-def.js";

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
                src: staticUrl("/pwa/manifest-192.png"),
                sizes: "192x192",
                type: "image/png",
                purpose: "maskable"
            },
            {
                src: staticUrl("/pwa/manifest-512.png"),
                sizes: "512x512",
                type: "image/png",
                purpose: "maskable"
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
