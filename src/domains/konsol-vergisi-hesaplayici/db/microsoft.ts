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
                title: "1TB",
                form: {
                    price: 499,
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
                title: "512GB",
                form: {
                    price: 299,
                    currency: "EUR"
                }
            },
            {
                title: "1TB",
                form: {
                    price: 349.99,
                    currency: "EUR"
                }
            }
        ]
    }
];
