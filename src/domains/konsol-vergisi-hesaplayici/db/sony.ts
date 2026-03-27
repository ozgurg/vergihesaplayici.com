import type { Brand, Preset } from "@/domains/konsol-vergisi-hesaplayici/types.js";
import { buildPageMeta } from "@/domains/konsol-vergisi-hesaplayici/utils/build-page-meta.js";

export const brand: Brand = {
    id: "sony",
    title: "Sony"
};

export const presets: Omit<Preset, "brandId">[] = [
    {
        title: "PlayStation 5",
        slug: "sony-playstation-5",
        releaseDate: new Date("2020-11-12"),
        thumb: "sony-playstation-5.png",
        ...buildPageMeta("Sony PlayStation 5'in"),
        options: [
            {
                title: "825GB – Disksiz",
                form: { // https://blog.playstation.com/2026/03/27/new-price-changes-for-ps5-ps5-pro-and-playstation-portal-remote-player/
                    price: 599.99,
                    currency: "EUR"
                }
            },
            {
                title: "825GB – Diskli",
                form: { // https://blog.playstation.com/2026/03/27/new-price-changes-for-ps5-ps5-pro-and-playstation-portal-remote-player/
                    price: 649.99,
                    currency: "EUR"
                }
            }
        ]
    },

    {
        title: "PlayStation VR2",
        slug: "sony-playstation-vr2",
        releaseDate: new Date("2023-02-22"),
        thumb: "sony-playstation-vr2.png",
        ...buildPageMeta("Sony PlayStation VR2'nin"),
        options: [
            {
                title: "PlayStation VR2",
                form: { // https://blog.playstation.com/2025/02/27/a-great-new-price-for-playstation-vr2/
                    price: 449.99,
                    currency: "EUR"
                }
            }
        ]
    },

    {
        title: "PlayStation 5 Pro",
        slug: "sony-playstation-5-pro",
        releaseDate: new Date("2024-11-07"),
        thumb: "sony-playstation-5-pro.png",
        ...buildPageMeta("Sony PlayStation 5 Pro'nun"),
        options: [
            {
                title: "2TB – Disksiz",
                form: { // https://blog.playstation.com/2026/03/27/new-price-changes-for-ps5-ps5-pro-and-playstation-portal-remote-player/
                    price: 899.99,
                    currency: "EUR"
                }
            }
        ]
    }
];
