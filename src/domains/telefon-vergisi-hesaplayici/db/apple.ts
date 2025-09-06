import type { Brand, Preset } from "@/domains/telefon-vergisi-hesaplayici/types.js";
import { Registration } from "@/domains/telefon-vergisi-hesaplayici/types.js";
import { buildPageMeta } from "@/domains/telefon-vergisi-hesaplayici/utils/build-page-meta.js";

const BRAND_ID = "apple";

export const brand: Brand = {
    id: BRAND_ID,
    title: "Apple"
};

export const presets: Preset[] = [
    {
        brandId: BRAND_ID,
        title: "Vision Pro",
        slug: "apple-vision-pro",
        releaseDate: new Date("2024-02-02"),
        thumb: "apple-vision-pro.png",
        ...buildPageMeta("Apple Vision Pro'nun"),
        disclaimerNote: "Bu ürün, resmi olarak Türkiye satılmadığı için hangi kategoriden vergilendirieceğiniz bilmiyoruz. Bu sayfa sadece bilgi vermek amacı taşımaktadır.",
        options: [
            {
                title: "Vision Pro",
                form: {
                    price: 3_499,
                    currency: "USD",
                    registration: Registration.PASSPORT
                }
            }
        ]
    },

    {
        brandId: BRAND_ID,
        title: "iPhone SE 3",
        slug: "apple-iphone-se-3-2022",
        releaseDate: new Date("2022-03-18"),
        thumb: "apple-iphone-se-3-2022.png",
        ...buildPageMeta("Apple iPhone SE 3 (2022)'ün"),
        options: [
            {
                title: "64GB",
                form: {
                    price: 429,
                    currency: "USD"
                }
            },
            {
                title: "128GB",
                form: {
                    price: 479,
                    currency: "USD"
                }
            },
            {
                title: "256GB",
                form: {
                    price: 579,
                    currency: "USD"
                }
            }
        ]
    },

    {
        brandId: BRAND_ID,
        title: "iPhone 12",
        slug: "apple-iphone-12",
        releaseDate: new Date("2020-10-23"),
        thumb: "apple-iphone-12.png",
        ...buildPageMeta("Apple iPhone 12'nin"),
        options: [
            {
                title: "64GB",
                form: {
                    price: 799,
                    currency: "USD"
                }
            },
            {
                title: "128GB",
                form: {
                    price: 849,
                    currency: "USD"
                }
            },
            {
                title: "256GB",
                form: {
                    price: 949,
                    currency: "USD"
                }
            }
        ]
    },

    {
        brandId: BRAND_ID,
        title: "iPhone 13 mini",
        slug: "apple-iphone-13-mini",
        releaseDate: new Date("2021-09-24"),
        thumb: "apple-iphone-13-mini.png",
        ...buildPageMeta("Apple iPhone 13 mini'nin"),
        options: [
            {
                title: "128GB",
                form: {
                    price: 699,
                    currency: "USD"
                }
            },
            {
                title: "256GB",
                form: {
                    price: 799,
                    currency: "USD"
                }
            },
            {
                title: "512GB",
                form: {
                    price: 999,
                    currency: "USD"
                }
            }
        ]
    },
    {
        brandId: BRAND_ID,
        title: "iPhone 13",
        slug: "apple-iphone-13",
        releaseDate: new Date("2021-09-24"),
        thumb: "apple-iphone-13.png",
        ...buildPageMeta("Apple iPhone 13'ün"),
        options: [
            {
                title: "128GB",
                form: {
                    price: 799,
                    currency: "USD"
                }
            },
            {
                title: "256GB",
                form: {
                    price: 899,
                    currency: "USD"
                }
            },
            {
                title: "512GB",
                form: {
                    price: 1_099,
                    currency: "USD"
                }
            }
        ]
    },

    {
        brandId: BRAND_ID,
        title: "iPhone 14 Pro",
        slug: "apple-iphone-14-pro",
        releaseDate: new Date("2022-09-16"),
        thumb: "apple-iphone-14-pro.png",
        ...buildPageMeta("Apple iPhone 14 Pro'nun"),
        options: [
            {
                title: "128GB",
                form: {
                    price: 999,
                    currency: "USD"
                }
            },
            {
                title: "256GB",
                form: {
                    price: 1_099,
                    currency: "USD"
                }
            },
            {
                title: "512GB",
                form: {
                    price: 1_299,
                    currency: "USD"
                }
            },
            {
                title: "1TB",
                form: {
                    price: 1_499,
                    currency: "USD"
                }
            }
        ]
    },
    {
        brandId: BRAND_ID,
        title: "iPhone 14 Pro Max",
        slug: "apple-iphone-14-pro-max",
        releaseDate: new Date("2022-09-16"),
        thumb: "apple-iphone-14-pro-max.png",
        ...buildPageMeta("Apple iPhone 14 Pro Max'in"),
        options: [
            {
                title: "128GB",
                form: {
                    price: 1_099,
                    currency: "USD"
                }
            },
            {
                title: "256GB",
                form: {
                    price: 1_199,
                    currency: "USD"
                }
            },
            {
                title: "512GB",
                form: {
                    price: 1_399,
                    currency: "USD"
                }
            },
            {
                title: "1TB",
                form: {
                    price: 1_599,
                    currency: "USD"
                }
            }
        ]
    },
    {
        brandId: BRAND_ID,
        title: "iPhone 14",
        slug: "apple-iphone-14",
        releaseDate: new Date("2022-09-16"),
        thumb: "apple-iphone-14.png",
        ...buildPageMeta("Apple iPhone 14'ün"),
        options: [
            {
                title: "128GB",
                form: {
                    price: 799,
                    currency: "USD"
                }
            },
            {
                title: "256GB",
                form: {
                    price: 899,
                    currency: "USD"
                }
            },
            {
                title: "512GB",
                form: {
                    price: 1_099,
                    currency: "USD"
                }
            }
        ]
    },
    {
        brandId: BRAND_ID,
        title: "iPhone 14 Plus",
        slug: "apple-iphone-14-plus",
        releaseDate: new Date("2022-10-07"),
        thumb: "apple-iphone-14-plus.png",
        ...buildPageMeta("Apple iPhone 14 Plus'ın"),
        options: [
            {
                title: "128GB",
                form: {
                    price: 899,
                    currency: "USD"
                }
            },
            {
                title: "256GB",
                form: {
                    price: 999,
                    currency: "USD"
                }
            },
            {
                title: "512GB",
                form: {
                    price: 1_199,
                    currency: "USD"
                }
            }
        ]
    },

    {
        brandId: BRAND_ID,
        title: "iPhone 15 Pro",
        slug: "apple-iphone-15-pro",
        releaseDate: new Date("2023-09-22"),
        thumb: "apple-iphone-15-pro.png",
        ...buildPageMeta("Apple iPhone 15 Pro'nun"),
        options: [
            {
                title: "128GB",
                form: {
                    price: 999,
                    currency: "USD"
                }
            },
            {
                title: "256GB",
                form: {
                    price: 1_099,
                    currency: "USD"
                }
            },
            {
                title: "512GB",
                form: {
                    price: 1_299,
                    currency: "USD"
                }
            },
            {
                title: "1TB",
                form: {
                    price: 1_499,
                    currency: "USD"
                }
            }
        ]
    },
    {
        brandId: BRAND_ID,
        title: "iPhone 15 Pro Max",
        slug: "apple-iphone-15-pro-max",
        releaseDate: new Date("2023-09-22"),
        thumb: "apple-iphone-15-pro-max.png",
        ...buildPageMeta("Apple iPhone 15 Pro Max'in"),
        options: [
            {
                title: "256GB",
                form: {
                    price: 1_199,
                    currency: "USD"
                }
            },
            {
                title: "512GB",
                form: {
                    price: 1_399,
                    currency: "USD"
                }
            },
            {
                title: "1TB",
                form: {
                    price: 1_599,
                    currency: "USD"
                }
            }
        ]
    },
    {
        brandId: BRAND_ID,
        title: "iPhone 15",
        slug: "apple-iphone-15",
        releaseDate: new Date("2023-09-22"),
        thumb: "apple-iphone-15.png",
        ...buildPageMeta("Apple iPhone 15'in"),
        options: [
            {
                title: "128GB",
                form: {
                    price: 799,
                    currency: "USD"
                }
            },
            {
                title: "256GB",
                form: {
                    price: 899,
                    currency: "USD"
                }
            },
            {
                title: "512GB",
                form: {
                    price: 1_099,
                    currency: "USD"
                }
            }
        ]
    },
    {
        brandId: BRAND_ID,
        title: "iPhone 15 Plus",
        slug: "apple-iphone-15-plus",
        releaseDate: new Date("2023-09-22"),
        thumb: "apple-iphone-15-plus.png",
        ...buildPageMeta("Apple iPhone 15 Plus'ın"),
        options: [
            {
                title: "128GB",
                form: {
                    price: 899,
                    currency: "USD"
                }
            },
            {
                title: "256GB",
                form: {
                    price: 999,
                    currency: "USD"
                }
            },
            {
                title: "512GB",
                form: {
                    price: 1_099,
                    currency: "USD"
                }
            }
        ]
    },

    {
        brandId: BRAND_ID,
        title: "iPhone 16 Pro",
        slug: "apple-iphone-16-pro",
        releaseDate: new Date("2024-09-20"),
        thumb: "apple-iphone-16-pro.png",
        ...buildPageMeta("Apple iPhone 16 Pro'nun"),
        options: [
            {
                title: "128GB",
                form: {
                    price: 999,
                    currency: "USD"
                }
            },
            {
                title: "256GB",
                form: {
                    price: 1_099,
                    currency: "USD"
                }
            },
            {
                title: "512GB",
                form: {
                    price: 1_299,
                    currency: "USD"
                }
            },
            {
                title: "1TB",
                form: {
                    price: 1_499,
                    currency: "USD"
                }
            }
        ]
    },
    {
        brandId: BRAND_ID,
        title: "iPhone 16 Pro Max",
        slug: "apple-iphone-16-pro-max",
        releaseDate: new Date("2024-09-20"),
        thumb: "apple-iphone-16-pro-max.png",
        ...buildPageMeta("Apple iPhone 16 Pro Max'in"),
        options: [
            {
                title: "256GB",
                form: {
                    price: 1_199,
                    currency: "USD"
                }
            },
            {
                title: "512GB",
                form: {
                    price: 1_399,
                    currency: "USD"
                }
            },
            {
                title: "1TB",
                form: {
                    price: 1_599,
                    currency: "USD"
                }
            }
        ]
    },
    {
        brandId: BRAND_ID,
        title: "iPhone 16",
        slug: "apple-iphone-16",
        releaseDate: new Date("2024-09-20"),
        thumb: "apple-iphone-16.png",
        ...buildPageMeta("Apple iPhone 16'nın"),
        options: [
            {
                title: "128GB",
                form: {
                    price: 799,
                    currency: "USD"
                }
            },
            {
                title: "256GB",
                form: {
                    price: 899,
                    currency: "USD"
                }
            },
            {
                title: "512GB",
                form: {
                    price: 1_099,
                    currency: "USD"
                }
            }
        ]
    },
    {
        brandId: BRAND_ID,
        title: "iPhone 16 Plus",
        slug: "apple-iphone-16-plus",
        releaseDate: new Date("2024-09-20"),
        thumb: "apple-iphone-16-plus.png",
        ...buildPageMeta("Apple iPhone 16 Plus'ın"),
        options: [
            {
                title: "128GB",
                form: {
                    price: 899,
                    currency: "USD"
                }
            },
            {
                title: "256GB",
                form: {
                    price: 999,
                    currency: "USD"
                }
            },
            {
                title: "512GB",
                form: {
                    price: 1_199,
                    currency: "USD"
                }
            }
        ]
    },
    {
        brandId: BRAND_ID,
        title: "iPhone 16e",
        slug: "apple-iphone-16e",
        releaseDate: new Date("2025-02-28"),
        thumb: "apple-iphone-16e.png",
        ...buildPageMeta("Apple iPhone 16e'nin"),
        options: [
            {
                title: "128GB",
                form: {
                    price: 599,
                    currency: "USD"
                }
            },
            {
                title: "256GB",
                form: {
                    price: 699,
                    currency: "USD"
                }
            },
            {
                title: "512GB",
                form: {
                    price: 899,
                    currency: "USD"
                }
            }
        ]
    }
];
