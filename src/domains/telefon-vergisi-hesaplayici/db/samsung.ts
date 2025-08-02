import type { Brand, Preset } from "@/domains/telefon-vergisi-hesaplayici/types.js";
import { buildPageMeta } from "@/domains/telefon-vergisi-hesaplayici/utils/build-page-meta.js";

const BRAND_ID = "samsung";

export const brand: Brand = {
    id: BRAND_ID,
    title: "Samsung"
};

export const presets: Preset[] = [
    {
        brandId: BRAND_ID,
        title: "Galaxy Z Fold4",
        slug: "samsung-galaxy-z-fold4",
        releaseDate: new Date("2022-08-25"),
        thumb: "samsung-galaxy-z-fold4.png",
        ...buildPageMeta("Samsung Galaxy Z Fold4'ün"),
        options: [
            {
                title: "256GB",
                form: { // https://www.phonearena.com/samsung-galaxy-z-fold-4-release-date-price-features#price
                    price: 1_799.99,
                    currency: "USD"
                }
            },
            {
                title: "512GB",
                form: { // https://www.phonearena.com/samsung-galaxy-z-fold-4-release-date-price-features#price
                    price: 1_919.99,
                    currency: "USD"
                }
            },
            {
                title: "1TB",
                form: { // https://www.phonearena.com/samsung-galaxy-z-fold-4-release-date-price-features#price
                    price: 2_159.99,
                    currency: "USD"
                }
            }
        ]
    },
    {
        brandId: BRAND_ID,
        title: "Galaxy Z Fold5",
        slug: "samsung-galaxy-z-fold5",
        releaseDate: new Date("2023-08-11"),
        thumb: "samsung-galaxy-z-fold5.png",
        ...buildPageMeta("Samsung Galaxy Z Fold5'in"),
        options: [
            {
                title: "256GB",
                form: { // https://www.phonearena.com/galaxy-z-fold-5-price-release-date-features#price
                    price: 1_799,
                    currency: "USD"
                }
            },
            {
                title: "512GB",
                form: { // https://www.phonearena.com/galaxy-z-fold-5-price-release-date-features#price
                    price: 1_919,
                    currency: "USD"
                }
            },
            {
                title: "1TB",
                form: { // https://www.phonearena.com/galaxy-z-fold-5-price-release-date-features#price
                    price: 2_159,
                    currency: "USD"
                }
            }
        ]
    },
    {
        brandId: BRAND_ID,
        title: "Galaxy Z Fold6",
        slug: "samsung-galaxy-z-fold6",
        releaseDate: new Date("2024-07-24"),
        thumb: "samsung-galaxy-z-fold6.png",
        ...buildPageMeta("Samsung Galaxy Z Fold6'nın"),
        options: [
            {
                title: "256GB",
                form: { // https://www.samsung.com/us/smartphones/galaxy-z-fold6/buy/galaxy-z-fold6-256gb-unlocked-sm-f956uakaxaa/
                    price: 1_899.99,
                    currency: "USD"
                }
            },
            {
                title: "512GB",
                form: { // https://www.samsung.com/us/smartphones/galaxy-z-fold6/buy/galaxy-z-fold6-512gb-unlocked-sm-f956uakexaa/
                    price: 2_019.99,
                    currency: "USD"
                }
            },
            {
                title: "1TB",
                form: { // https://www.samsung.com/us/smartphones/galaxy-z-fold6/buy/galaxy-z-fold6-1tb-unlocked-sm-f956uakfxaa/
                    price: 2_259.99,
                    currency: "USD"
                }
            }
        ]
    },

    {
        brandId: BRAND_ID,
        title: "Galaxy Z Flip4",
        slug: "samsung-galaxy-z-flip4",
        releaseDate: new Date("2022-08-25"),
        thumb: "samsung-galaxy-z-flip4.png",
        ...buildPageMeta("Samsung Galaxy Z Flip4'ün"),
        options: [
            {
                title: "128GB",
                form: { // https://www.phonearena.com/galaxy-z-flip-4-release-date-price-features#price
                    price: 999.99,
                    currency: "USD"
                }
            },
            {
                title: "256GB",
                form: { // https://www.phonearena.com/galaxy-z-flip-4-release-date-price-features#price
                    price: 1_059.99,
                    currency: "USD"
                }
            },
            {
                title: "512GB",
                form: { // https://www.phonearena.com/galaxy-z-flip-4-release-date-price-features#price
                    price: 1_179.99,
                    currency: "USD"
                }
            }
        ]
    },
    {
        brandId: BRAND_ID,
        title: "Galaxy Z Flip5",
        slug: "samsung-galaxy-z-flip5",
        releaseDate: new Date("2023-08-11"),
        thumb: "samsung-galaxy-z-flip5.png",
        ...buildPageMeta("Samsung Galaxy Z Flip5'in"),
        options: [
            {
                title: "256GB",
                form: { // https://www.phonearena.com/galaxy-z-flip-5-release-date-price-features#price
                    price: 999,
                    currency: "USD"
                }
            },
            {
                title: "512GB",
                form: { // https://www.phonearena.com/galaxy-z-flip-5-release-date-price-features#price
                    price: 1_199.99,
                    currency: "USD"
                }
            }
        ]
    },
    {
        brandId: BRAND_ID,
        title: "Galaxy Z Flip6",
        slug: "samsung-galaxy-z-flip6",
        releaseDate: new Date("2024-07-24"),
        thumb: "samsung-galaxy-z-flip6.png",
        ...buildPageMeta("Samsung Galaxy Z Flip6'nın"),
        options: [
            {
                title: "256GB",
                form: { // https://www.samsung.com/us/smartphones/galaxy-z-flip6/buy/galaxy-z-flip6-256gb-unlocked-sm-f741uakaxaa/
                    price: 1_099.99,
                    currency: "USD"
                }
            },
            {
                title: "512GB",
                form: { // https://www.samsung.com/us/smartphones/galaxy-z-flip6/buy/galaxy-z-flip6-512gb-unlocked-sm-f741uakexaa/
                    price: 1_219.99,
                    currency: "USD"
                }
            }
        ]
    },

    {
        brandId: BRAND_ID,
        title: "Galaxy S23",
        slug: "samsung-galaxy-s23",
        releaseDate: new Date("2023-02-17"),
        thumb: "samsung-galaxy-s23.png",
        ...buildPageMeta("Samsung Galaxy S23'ün"),
        options: [
            {
                title: "128GB",
                form: { // https://www.phonearena.com/galaxy-s23-release-date-price-features#s23price
                    price: 799,
                    currency: "USD"
                }
            },
            {
                title: "256GB",
                form: { // https://www.phonearena.com/galaxy-s23-release-date-price-features#s23price
                    price: 859,
                    currency: "USD"
                }
            }
        ]
    },
    {
        brandId: BRAND_ID,
        title: "Galaxy S23+",
        slug: "samsung-galaxy-s23-plus",
        releaseDate: new Date("2023-02-17"),
        thumb: "samsung-galaxy-s23-plus.png",
        ...buildPageMeta("Samsung Galaxy S23+'nın"),
        options: [
            {
                title: "256GB",
                form: { // https://www.phonearena.com/galaxy-s23-release-date-price-features#s23price
                    price: 999,
                    currency: "USD"
                }
            },
            {
                title: "512GB",
                form: { // https://www.phonearena.com/galaxy-s23-release-date-price-features#s23price
                    price: 1_119,
                    currency: "USD"
                }
            }
        ]
    },
    {
        brandId: BRAND_ID,
        title: "Galaxy S23 Ultra",
        slug: "samsung-galaxy-s23-ultra",
        releaseDate: new Date("2023-02-17"),
        thumb: "samsung-galaxy-s23-ultra.png",
        ...buildPageMeta("Samsung Galaxy S23 Ultra'nın"),
        options: [
            {
                title: "256GB – 8GB",
                form: { // https://www.phonearena.com/galaxy-s23-release-date-price-features#s23price
                    price: 1_199,
                    currency: "USD"
                }
            },
            {
                title: "512GB – 8GB",
                form: { // https://www.phonearena.com/galaxy-s23-release-date-price-features#s23price
                    price: 1_299,
                    currency: "USD"
                }
            },
            {
                title: "1TB – 12GB",
                form: { // https://www.phonearena.com/galaxy-s23-release-date-price-features#s23price
                    price: 1_619,
                    currency: "USD"
                }
            }
        ]
    },

    {
        brandId: BRAND_ID,
        title: "Galaxy S24",
        slug: "samsung-galaxy-s24",
        releaseDate: new Date("2024-01-24"),
        thumb: "samsung-galaxy-s24.png",
        ...buildPageMeta("Samsung Galaxy S24'ün"),
        options: [
            {
                title: "128GB",
                form: { // https://www.phonearena.com/galaxy-s24-release-date-price-news#price
                    price: 799,
                    currency: "USD"
                }
            },
            {
                title: "256GB",
                form: { // https://www.phonearena.com/galaxy-s24-release-date-price-news#price
                    price: 859,
                    currency: "USD"
                }
            }
        ]
    },
    {
        brandId: BRAND_ID,
        title: "Galaxy S24+",
        slug: "samsung-galaxy-s24-plus",
        releaseDate: new Date("2024-01-24"),
        thumb: "samsung-galaxy-s24-plus.png",
        ...buildPageMeta("Samsung Galaxy S24+'nın"),
        options: [
            {
                title: "256GB",
                form: { // https://www.phonearena.com/galaxy-s24-release-date-price-news#price
                    price: 999,
                    currency: "USD"
                }
            },
            {
                title: "512GB",
                form: { // https://www.phonearena.com/galaxy-s24-release-date-price-news#price
                    price: 1_119,
                    currency: "USD"
                }
            }
        ]
    },
    {
        brandId: BRAND_ID,
        title: "Galaxy S24 Ultra",
        slug: "samsung-galaxy-s24-ultra",
        releaseDate: new Date("2024-01-24"),
        thumb: "samsung-galaxy-s24-ultra.png",
        ...buildPageMeta("Samsung Galaxy S24 Ultra'nın"),
        options: [
            {
                title: "256GB",
                form: { // https://www.phonearena.com/galaxy-s24-ultra-release-date-price-features-news#price
                    price: 1_299.99,
                    currency: "USD"
                }
            },
            {
                title: "512GB",
                form: { // https://www.phonearena.com/galaxy-s24-ultra-release-date-price-features-news#price
                    price: 1_419.99,
                    currency: "USD"
                }
            },
            {
                title: "1TB",
                form: { // https://www.phonearena.com/galaxy-s24-ultra-release-date-price-features-news#price
                    price: 1_659.99,
                    currency: "USD"
                }
            }
        ]
    },

    {
        brandId: BRAND_ID,
        title: "Galaxy S25",
        slug: "samsung-galaxy-s25",
        releaseDate: new Date("2025-02-03"),
        thumb: "samsung-galaxy-s25.png",
        ...buildPageMeta("Samsung Galaxy S25'in"),
        options: [
            {
                title: "128GB",
                form: { // https://www.samsung.com/us/smartphones/galaxy-s25/buy/galaxy-s25-128gb-unlocked-sm-s931udbaxaa/
                    price: 799.99,
                    currency: "USD"
                }
            },
            {
                title: "256GB",
                form: { // https://www.samsung.com/us/smartphones/galaxy-s25/buy/galaxy-s25-256gb-unlocked-sm-s931udbexaa/
                    price: 859.99,
                    currency: "USD"
                }
            }
        ]
    },
    {
        brandId: BRAND_ID,
        title: "Galaxy S25+",
        slug: "samsung-galaxy-s25-plus",
        releaseDate: new Date("2025-02-03"),
        thumb: "samsung-galaxy-s25-plus.png",
        ...buildPageMeta("Samsung Galaxy S25+'nın"),
        options: [
            {
                title: "256GB",
                form: { // https://www.samsung.com/us/smartphones/galaxy-s25/buy/galaxy-s25-plus-256gb-unlocked-sm-s936udbaxaa/
                    price: 999.99,
                    currency: "USD"
                }
            },
            {
                title: "512GB",
                form: { // https://www.samsung.com/us/smartphones/galaxy-s25/buy/galaxy-s25-plus-512gb-unlocked-sm-s936udbexaa/
                    price: 1_119.99,
                    currency: "USD"
                }
            }
        ]
    },
    {
        brandId: BRAND_ID,
        title: "Galaxy S25 Ultra",
        slug: "samsung-galaxy-s25-ultra",
        releaseDate: new Date("2025-02-03"),
        thumb: "samsung-galaxy-s25-ultra.png",
        ...buildPageMeta("Samsung Galaxy S25 Ultra'nın"),
        options: [
            {
                title: "256GB",
                form: { // https://www.samsung.com/us/smartphones/galaxy-s25-ultra/buy/galaxy-s25-ultra-256gb-unlocked-sm-s938uztaxaa/
                    price: 1_299.99,
                    currency: "USD"
                }
            },
            {
                title: "512GB",
                form: { // https://www.samsung.com/us/smartphones/galaxy-s25-ultra/buy/galaxy-s25-ultra-512gb-unlocked-sm-s938uztexaa/
                    price: 1_419.99,
                    currency: "USD"
                }
            },
            {
                title: "1TB",
                form: { // https://www.samsung.com/us/smartphones/galaxy-s25-ultra/buy/galaxy-s25-ultra-1tb-unlocked-sm-s938uztfxaa/
                    price: 1_659.99,
                    currency: "USD"
                }
            }
        ]
    },
    {
        brandId: BRAND_ID,
        title: "Galaxy S25 Edge",
        slug: "samsung-galaxy-s25-edge",
        releaseDate: new Date("2025-05-29"),
        thumb: "samsung-galaxy-s25-edge.png",
        ...buildPageMeta("Samsung Galaxy S25 Edge'nin"),
        options: [
            {
                title: "256GB",
                form: { // https://www.samsung.com/us/smartphones/galaxy-s25-edge/buy/galaxy-s25-edge-256gb-unlocked-sku-sm-s937uzsaxaa/
                    price: 1_099.99,
                    currency: "USD"
                }
            },
            {
                title: "512GB",
                form: { // https://www.samsung.com/us/smartphones/galaxy-s25-edge/buy/galaxy-s25-edge-256gb-unlocked-sku-sm-s937uzsaxaa/
                    price: 1_219.99,
                    currency: "USD"
                }
            }
        ]
    },

    {
        brandId: BRAND_ID,
        title: "Galaxy Z Fold7",
        slug: "samsung-galaxy-z-fold7",
        releaseDate: new Date("2025-07-25"),
        thumb: "samsung-galaxy-z-fold7.png",
        ...buildPageMeta("Samsung Galaxy Z Fold7'nin"),
        options: [
            {
                title: "256GB",
                form: { // https://www.samsung.com/us/smartphones/galaxy-z-fold7/buy/galaxy-z-fold7-256gb-unlocked-sku-sm-f966udbaxaa/
                    price: 1_999.99,
                    currency: "USD"
                }
            },
            {
                title: "512GB",
                form: { // https://www.samsung.com/us/smartphones/galaxy-z-fold7/buy/galaxy-z-fold7-256gb-unlocked-sku-sm-f966udbaxaa/
                    price: 2_119.99,
                    currency: "USD"
                }
            },
            {
                title: "1TB",
                form: { // https://www.samsung.com/us/smartphones/galaxy-z-fold7/buy/galaxy-z-fold7-256gb-unlocked-sku-sm-f966udbaxaa/
                    price: 2_419.99,
                    currency: "USD"
                }
            }
        ]
    },
    {
        brandId: BRAND_ID,
        title: "Galaxy Z Flip7",
        slug: "samsung-galaxy-z-flip7",
        releaseDate: new Date("2025-07-25"),
        thumb: "samsung-galaxy-z-flip7.png",
        ...buildPageMeta("Samsung Galaxy Z Flip7'nin"),
        options: [
            {
                title: "256GB",
                form: { // https://www.samsung.com/us/smartphones/galaxy-z-flip7/buy/galaxy-z-flip7-256gb-unlocked-sku-sm-f766uzkaxaa/
                    price: 1_099.99,
                    currency: "USD"
                }
            },
            {
                title: "512GB",
                form: { // https://www.samsung.com/us/smartphones/galaxy-z-flip7/buy/galaxy-z-flip7-256gb-unlocked-sku-sm-f766uzkaxaa/
                    price: 1_219.99,
                    currency: "USD"
                }
            }
        ]
    },
];
