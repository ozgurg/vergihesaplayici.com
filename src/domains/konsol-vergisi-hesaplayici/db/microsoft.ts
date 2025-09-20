import type { Brand, Preset } from "@/domains/konsol-vergisi-hesaplayici/types.js";
import { buildPageMeta } from "@/domains/konsol-vergisi-hesaplayici/utils/build-page-meta.js";

const BRAND_ID = "microsoft";

export const brand: Brand = {
    id: BRAND_ID,
    title: "Microsoft"
};

export const presets: Preset[] = [
    {
        brandId: BRAND_ID,
        title: "Xbox Series X",
        slug: "microsoft-xbox-series-x",
        releaseDate: new Date("2020-11-10"),
        thumb: "microsoft-xbox-series-x.png",
        ...buildPageMeta("Microsoft Xbox Series X'in"),
        options: [
            {
                title: "Disksiz – 1TB",
                form: {
                    price: 549.99,
                    currency: "EUR"
                }
            },
            {
                title: "Diskli – 1TB",
                form: {
                    price: 599.99,
                    currency: "EUR"
                }
            },
            {
                title: "Diskli – 2TB",
                form: {
                    price: 699.99,
                    currency: "EUR"
                }
            }
        ]
    },

    {
        brandId: BRAND_ID,
        title: "Xbox Series S",
        slug: "microsoft-xbox-series-s",
        releaseDate: new Date("2020-11-10"),
        thumb: "microsoft-xbox-series-s.png",
        ...buildPageMeta("Microsoft Xbox Series S'nin"),
        options: [
            {
                title: "Disksiz – 512GB",
                form: {
                    price: 349.99,
                    currency: "EUR"
                }
            },
            {
                title: "Disksiz – 1TB",
                form: {
                    price: 399.99,
                    currency: "EUR"
                }
            }
        ]
    }
];
