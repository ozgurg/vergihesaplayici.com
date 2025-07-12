import type { Brand, Preset } from "@/domains/konsol-vergisi-hesaplayici/types.js";
import { buildPageMeta } from "@/domains/konsol-vergisi-hesaplayici/utils/build-page-meta.js";

const BRAND_ID = "nintendo";

export const brand: Brand = {
    id: BRAND_ID,
    title: "Nintendo"
};

export const presets: Preset[] = [
    {
        brandId: BRAND_ID,
        title: "Switch",
        slug: "nintendo-switch",
        releaseDate: new Date("2017-03-03"),
        thumb: "nintendo-switch.png",
        ...buildPageMeta("Nintendo Switch'in"),
        options: [
            {
                title: "32GB",
                form: {
                    price: 299.99,
                    currency: "USD"
                }
            }
        ]
    },

    {
        brandId: BRAND_ID,
        title: "Switch Lite",
        slug: "nintendo-switch-lite",
        releaseDate: new Date("2019-09-20"),
        thumb: "nintendo-switch-lite.png",
        ...buildPageMeta("Nintendo Switch Lite'nin"),
        options: [
            {
                title: "32GB",
                form: {
                    price: 199.99,
                    currency: "USD"
                }
            }
        ]
    },

    {
        brandId: BRAND_ID,
        title: "Switch OLED",
        slug: "nintendo-switch-oled",
        releaseDate: new Date("2021-10-08"),
        thumb: "nintendo-switch-oled.png",
        ...buildPageMeta("Nintendo Switch OLED'in"),
        options: [
            {
                title: "64GB",
                form: {
                    price: 349.99,
                    currency: "USD"
                }
            }
        ]
    },

    {
        brandId: BRAND_ID,
        title: "Switch 2",
        slug: "nintendo-switch-2",
        releaseDate: new Date("2025-06-05"),
        thumb: "nintendo-switch-2.png",
        ...buildPageMeta("Nintendo Switch 2'nin"),
        options: [
            {
                title: "256GB",
                form: {
                    price: 449.99,
                    currency: "USD"
                }
            }
        ]
    }
];
