import type { Brand, Preset } from "@/domains/konsol-vergisi-hesaplayici/types.js";
import { buildPageMeta } from "@/domains/konsol-vergisi-hesaplayici/utils/build-page-meta.js";

export const brand: Brand = {
    id: "nintendo",
    title: "Nintendo"
};

export const presets: Omit<Preset, "brandId">[] = [
    {
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
