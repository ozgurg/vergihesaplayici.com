import type { Brand, Preset } from "@/domains/konsol-vergisi-hesaplayici/types.js";
import { buildPageMeta } from "@/domains/konsol-vergisi-hesaplayici/utils/build-page-meta.js";

const BRAND_ID = "sony";

export const brand: Brand = {
    id: BRAND_ID,
    title: "Sony"
};

export const presets: Preset[] = [
    {
        brandId: BRAND_ID,
        title: "PlayStation 5",
        slug: "sony-playstation-5",
        releaseDate: new Date("2020-11-12"),
        thumb: "sony-playstation-5.png",
        ...buildPageMeta("Sony PlayStation 5'in"),
        options: [
            {
                title: "825GB – Disksiz",
                form: { // https://blog.playstation.com/2022/08/25/ps5-price-to-increase-in-select-markets-due-to-global-economic-environment-including-high-inflation-rates/
                    price: 449.99,
                    currency: "EUR"
                }
            },
            {
                title: "825GB – Diskli",
                form: { // https://blog.playstation.com/2022/08/25/ps5-price-to-increase-in-select-markets-due-to-global-economic-environment-including-high-inflation-rates/
                    price: 549.99,
                    currency: "EUR"
                }
            }
        ]
    },

    {
        brandId: BRAND_ID,
        title: "PlayStation VR2",
        slug: "sony-playstation-vr2",
        releaseDate: new Date("2023-02-22"),
        thumb: "sony-playstation-vr2.png",
        ...buildPageMeta("Sony PlayStation VR2'nin"),
        options: [
            {
                title: "PlayStation VR2",
                form: { // https://blog.playstation.com/2022/11/02/playstation-vr2-launches-in-february-at-549-99/
                    price: 599.99,
                    currency: "EUR"
                }
            }
        ]
    },

    {
        brandId: BRAND_ID,
        title: "PlayStation 5 Pro",
        slug: "sony-playstation-5-pro",
        releaseDate: new Date("2024-11-07"),
        thumb: "sony-playstation-5-pro.png",
        ...buildPageMeta("Sony PlayStation 5 Pro'nun"),
        options: [
            {
                title: "2TB – Disksiz",
                form: { // https://www.youtube.com/live/X24BzyzQQ-8?t=1096
                    price: 799.99,
                    currency: "EUR"
                }
            }
        ]
    }
];
