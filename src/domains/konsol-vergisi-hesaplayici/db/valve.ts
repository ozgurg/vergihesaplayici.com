import type { Brand, Preset } from "@/domains/konsol-vergisi-hesaplayici/types.js";
import { buildPageMeta } from "@/domains/konsol-vergisi-hesaplayici/utils/build-page-meta.js";

const DISCLAIMER_NOTE = "Bu ürün Türkiye'de resmi olarak satılmadığından, hangi vergi kategorisine gireceği kesin olarak bilinmemektedir. Bu sayfa yalnızca bilgi verme amacı taşır.";

const BRAND_ID = "valve";

export const brand: Brand = {
    id: BRAND_ID,
    title: "Valve"
};

export const presets: Preset[] = [
    {
        brandId: BRAND_ID,
        title: "Steam Deck",
        slug: "valve-steam-deck",
        releaseDate: new Date("2022-02-25"),
        thumb: "valve-steam-deck.png",
        ...buildPageMeta("Valve Steam Deck'in"),
        disclaimerNote: DISCLAIMER_NOTE,
        options: [
            {
                title: "64GB",
                form: {
                    price: 399,
                    currency: "USD"
                }
            },
            {
                title: "256GB",
                form: {
                    price: 529,
                    currency: "USD"
                }
            },
            {
                title: "512GB",
                form: {
                    price: 649,
                    currency: "USD"
                }
            }
        ]
    },

    {
        brandId: BRAND_ID,
        title: "Steam Deck OLED",
        slug: "valve-steam-deck-oled",
        releaseDate: new Date("2023-11-16"),
        thumb: "valve-steam-deck-oled.png",
        ...buildPageMeta("Valve Steam Deck OLED'in"),
        disclaimerNote: DISCLAIMER_NOTE,
        options: [
            {
                title: "512GB",
                form: {
                    price: 549,
                    currency: "USD"
                }
            },
            {
                title: "1TB",
                form: {
                    price: 649,
                    currency: "USD"
                }
            }
        ]
    }
];
