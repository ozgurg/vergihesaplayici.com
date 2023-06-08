import { mdiApple } from "@mdi/js";
import { buildHeadTags } from "@/utils/build-head-tags.js";
import TelefonVergisiHesaplayici from "@/data/pages/telefon-vergisi-hesaplayici/telefon-vergisi-hesaplayici.page.js";
import { findCalculatorPresetBySlug } from "@/utils/find-calculator-preset-by-slug.js";

const buildUrl = slug => `/telefon-vergisi-hesaplayici/${slug}/`;

const lastUpdatedDateIphone = new Date("Thu Jun 08 2023 09:44:05 GMT+0300 (GMT+03:00)");
const lastUpdatedDateSamsung = new Date("Tue Jun 06 2023 22:41:26 GMT+0300 (GMT+03:00)");

const presets = [
    // Apple Vision Pro
    {
        title: "Apple Vision Pro",
        slug: "apple-vision-pro",
        url: buildUrl("apple-vision-pro"),
        icon: mdiApple,
        color: "#555",
        ogImageName: "telefon-vergisi-hesaplayici-apple-vision-pro.jpg",
        pageTitle: "Apple Vision Pro'nun vergisi ne kadar?",
        pageDescription: "Apple Vision Pro'nun vergili ve vergisiz fiyatını hesaplayın, yurt içi ve yurt dışı fiyatlarını karşılaştırın.",
        options: [
            {
                title: "Standart",
                form: { price: 3499, currency: "USD" }
            }
        ]
    },

    // iPhone 14
    {
        title: "iPhone 14 Pro",
        slug: "iphone-14-pro",
        url: buildUrl("iphone-14-pro"),
        icon: mdiApple,
        color: "#555",
        ogImageName: "telefon-vergisi-hesaplayici-iphone-14-pro.jpg",
        pageTitle: "iPhone 14 Pro'nun vergisi ne kadar?",
        pageDescription: "iPhone 14 Pro'nun vergili ve vergisiz fiyatını hesaplayın, yurt içi ve yurt dışı fiyatlarını karşılaştırın.",
        options: [
            {
                title: "128GB",
                form: { price: 999, currency: "USD" },
                retailPrice: {
                    value: 54999,
                    lastUpdatedDate: lastUpdatedDateIphone,
                    sourceUrl: "https://www.apple.com/tr/shop/buy-iphone/iphone-14-pro"
                }
            },
            {
                title: "256GB",
                form: { price: 1099, currency: "USD" },
                retailPrice: {
                    value: 58499,
                    lastUpdatedDate: lastUpdatedDateIphone,
                    sourceUrl: "https://www.apple.com/tr/shop/buy-iphone/iphone-14-pro"
                }
            },
            {
                title: "512GB",
                form: { price: 1299, currency: "USD" },
                retailPrice: {
                    value: 65499,
                    lastUpdatedDate: lastUpdatedDateIphone,
                    sourceUrl: "https://www.apple.com/tr/shop/buy-iphone/iphone-14-pro"
                }
            },
            {
                title: "1TB",
                form: { price: 1499, currency: "USD" },
                retailPrice: {
                    value: 72499,
                    lastUpdatedDate: lastUpdatedDateIphone,
                    sourceUrl: "https://www.apple.com/tr/shop/buy-iphone/iphone-14-pro"
                }
            }
        ]
    },
    {
        title: "iPhone 14 Pro Max",
        slug: "iphone-14-pro-max",
        url: buildUrl("iphone-14-pro-max"),
        icon: mdiApple,
        color: "#555",
        ogImageName: "telefon-vergisi-hesaplayici-iphone-14-pro-max.jpg",
        pageTitle: "iPhone 14 Pro Max'in vergisi ne kadar?",
        pageDescription: "iPhone 14 Pro Max'in vergili ve vergisiz fiyatını hesaplayın, yurt içi ve yurt dışı fiyatlarını karşılaştırın.",
        options: [
            {
                title: "128GB",
                form: { price: 1099, currency: "USD" },
                retailPrice: {
                    value: 58999,
                    lastUpdatedDate: lastUpdatedDateIphone,
                    sourceUrl: "https://www.apple.com/tr/shop/buy-iphone/iphone-14-pro"
                }
            },
            {
                title: "256GB",
                form: { price: 1199, currency: "USD" },
                retailPrice: {
                    value: 62499,
                    lastUpdatedDate: lastUpdatedDateIphone,
                    sourceUrl: "https://www.apple.com/tr/shop/buy-iphone/iphone-14-pro"
                }
            },
            {
                title: "512GB",
                form: { price: 1399, currency: "USD" },
                retailPrice: {
                    value: 69499,
                    lastUpdatedDate: lastUpdatedDateIphone,
                    sourceUrl: "https://www.apple.com/tr/shop/buy-iphone/iphone-14-pro"
                }
            },
            {
                title: "1TB",
                form: { price: 1599, currency: "USD" },
                retailPrice: {
                    value: 76499,
                    lastUpdatedDate: lastUpdatedDateIphone,
                    sourceUrl: "https://www.apple.com/tr/shop/buy-iphone/iphone-14-pro"
                }
            }
        ]
    },
    {
        title: "iPhone 14",
        slug: "iphone-14",
        url: buildUrl("iphone-14"),
        icon: mdiApple,
        color: "#555",
        ogImageName: "telefon-vergisi-hesaplayici-iphone-14.jpg",
        pageTitle: "iPhone 14'ün vergisi ne kadar?",
        pageDescription: "iPhone 14'ün vergili ve vergisiz fiyatını hesaplayın, yurt içi ve yurt dışı fiyatlarını karşılaştırın.",
        options: [
            {
                title: "128GB",
                form: { price: 799, currency: "USD" },
                retailPrice: {
                    value: 42499,
                    lastUpdatedDate: lastUpdatedDateIphone,
                    sourceUrl: "https://www.apple.com/tr/shop/buy-iphone/iphone-14"
                }
            },
            {
                title: "256GB",
                form: { price: 899, currency: "USD" },
                retailPrice: {
                    value: 45999,
                    lastUpdatedDate: lastUpdatedDateIphone,
                    sourceUrl: "https://www.apple.com/tr/shop/buy-iphone/iphone-14"
                }
            },
            {
                title: "512GB",
                form: { price: 1099, currency: "USD" },
                retailPrice: {
                    value: 52999,
                    lastUpdatedDate: lastUpdatedDateIphone,
                    sourceUrl: "https://www.apple.com/tr/shop/buy-iphone/iphone-14"
                }
            }
        ]
    },
    {
        title: "iPhone 14 Plus",
        slug: "iphone-14-plus",
        url: buildUrl("iphone-14-plus"),
        icon: mdiApple,
        color: "#555",
        ogImageName: "telefon-vergisi-hesaplayici-iphone-14-plus.jpg",
        pageTitle: "iPhone 14 Plus'ın vergisi ne kadar?",
        pageDescription: "iPhone 14 Plus'ın vergili ve vergisiz fiyatını hesaplayın, yurt içi ve yurt dışı fiyatlarını karşılaştırın.",
        options: [
            {
                title: "128GB",
                form: { price: 899, currency: "USD" },
                retailPrice: {
                    value: 46999,
                    lastUpdatedDate: lastUpdatedDateIphone,
                    sourceUrl: "https://www.apple.com/tr/shop/buy-iphone/iphone-14"
                }
            },
            {
                title: "256GB",
                form: { price: 999, currency: "USD" },
                retailPrice: {
                    value: 50499,
                    lastUpdatedDate: lastUpdatedDateIphone,
                    sourceUrl: "https://www.apple.com/tr/shop/buy-iphone/iphone-14"
                }
            },
            {
                title: "512GB",
                form: { price: 1199, currency: "USD" },
                retailPrice: {
                    value: 57499,
                    lastUpdatedDate: lastUpdatedDateIphone,
                    sourceUrl: "https://www.apple.com/tr/shop/buy-iphone/iphone-14"
                }
            }
        ]
    },


    // iPhone 13
    {
        title: "iPhone 13 mini",
        slug: "iphone-13-mini",
        url: buildUrl("iphone-13-mini"),
        icon: mdiApple,
        color: "#555",
        ogImageName: "telefon-vergisi-hesaplayici-iphone-13-mini.jpg",
        pageTitle: "iPhone 13 mini'nin vergisi ne kadar?",
        pageDescription: "iPhone 13 mini'nin vergili ve vergisiz fiyatını hesaplayın, yurt içi ve yurt dışı fiyatlarını karşılaştırın.",
        options: [
            {
                title: "128GB",
                form: { price: 599, currency: "USD" },
                retailPrice: {
                    value: 31999,
                    lastUpdatedDate: lastUpdatedDateIphone,
                    sourceUrl: "https://www.apple.com/tr/shop/buy-iphone/iphone-13"
                }
            },
            {
                title: "256GB",
                form: { price: 699, currency: "USD" },
                retailPrice: {
                    value: 35499,
                    lastUpdatedDate: lastUpdatedDateIphone,
                    sourceUrl: "https://www.apple.com/tr/shop/buy-iphone/iphone-13"
                }
            },
            {
                title: "512GB",
                form: { price: 899, currency: "USD" },
                retailPrice: {
                    value: 42499,
                    lastUpdatedDate: lastUpdatedDateIphone,
                    sourceUrl: "https://www.apple.com/tr/shop/buy-iphone/iphone-13"
                }
            }
        ]
    },
    {
        title: "iPhone 13",
        slug: "iphone-13",
        url: buildUrl("iphone-13"),
        icon: mdiApple,
        color: "#555",
        ogImageName: "telefon-vergisi-hesaplayici-iphone-13.jpg",
        pageTitle: "iPhone 13'ün vergisi ne kadar?",
        pageDescription: "iPhone 13'ün vergili ve vergisiz fiyatını hesaplayın, yurt içi ve yurt dışı fiyatlarını karşılaştırın.",
        options: [
            {
                title: "128GB",
                form: { price: 699, currency: "USD" },
                retailPrice: {
                    value: 35999,
                    lastUpdatedDate: lastUpdatedDateIphone,
                    sourceUrl: "https://www.apple.com/tr/shop/buy-iphone/iphone-13"
                }
            },
            {
                title: "256GB",
                form: { price: 799, currency: "USD" },
                retailPrice: {
                    value: 39499,
                    lastUpdatedDate: lastUpdatedDateIphone,
                    sourceUrl: "https://www.apple.com/tr/shop/buy-iphone/iphone-13"
                }
            },
            {
                title: "512GB",
                form: { price: 999, currency: "USD" },
                retailPrice: {
                    value: 46499,
                    lastUpdatedDate: lastUpdatedDateIphone,
                    sourceUrl: "https://www.apple.com/tr/shop/buy-iphone/iphone-13"
                }
            }
        ]
    },


    // iPhone SE
    {
        title: "iPhone SE 3 (2022)",
        slug: "iphone-se-3-2022",
        url: buildUrl("iphone-se-3-2022"),
        icon: mdiApple,
        color: "#555",
        ogImageName: "telefon-vergisi-hesaplayici-iphone-se-2022.jpg",
        pageTitle: "iPhone SE 3'ün (2022) vergisi ne kadar?",
        pageDescription: "iPhone SE 3 (2022)'ün vergili ve vergisiz fiyatını hesaplayın, yurt içi ve yurt dışı fiyatlarını karşılaştırın.",
        options: [
            {
                title: "64GB",
                form: { price: 429, currency: "USD" },
                retailPrice: {
                    value: 21999,
                    lastUpdatedDate: lastUpdatedDateIphone,
                    sourceUrl: "https://www.apple.com/tr/shop/buy-iphone/iphone-se"
                }
            },
            {
                title: "128GB",
                form: { price: 479, currency: "USD" },
                retailPrice: {
                    value: 23699,
                    lastUpdatedDate: lastUpdatedDateIphone,
                    sourceUrl: "https://www.apple.com/tr/shop/buy-iphone/iphone-se"
                }
            },
            {
                title: "256GB",
                form: { price: 579, currency: "USD" },
                retailPrice: {
                    value: 27199,
                    lastUpdatedDate: lastUpdatedDateIphone,
                    sourceUrl: "https://www.apple.com/tr/shop/buy-iphone/iphone-se"
                }
            }
        ]
    },


    // iPhone 12
    {
        title: "iPhone 12",
        slug: "iphone-12",
        url: buildUrl("iphone-12"),
        icon: mdiApple,
        color: "#555",
        ogImageName: "telefon-vergisi-hesaplayici-iphone-12.jpg",
        pageTitle: "iPhone 12'nin vergisi ne kadar?",
        pageDescription: "iPhone 12'nin vergili ve vergisiz fiyatını hesaplayın, yurt içi ve yurt dışı fiyatlarını karşılaştırın.",
        options: [
            {
                title: "64GB",
                form: { price: 599, currency: "USD" },
                retailPrice: {
                    value: 31999,
                    lastUpdatedDate: lastUpdatedDateIphone,
                    sourceUrl: "https://www.apple.com/tr/shop/buy-iphone/iphone-12"
                }
            },
            {
                title: "128GB",
                form: { price: 649, currency: "USD" },
                retailPrice: {
                    value: 33699,
                    lastUpdatedDate: lastUpdatedDateIphone,
                    sourceUrl: "https://www.apple.com/tr/shop/buy-iphone/iphone-12"
                }
            },
            {
                title: "256GB",
                form: { price: 749, currency: "USD" },
                retailPrice: {
                    value: 37199,
                    lastUpdatedDate: lastUpdatedDateIphone,
                    sourceUrl: "https://www.apple.com/tr/shop/buy-iphone/iphone-12"
                }
            }
        ]
    },


    // Samsung Galaxy S23
    {
        title: "Samsung Galaxy S23",
        slug: "samsung-galaxy-s23",
        url: buildUrl("samsung-galaxy-s23"),
        icon: "samsung.svg",
        color: "#1428A0",
        ogImageName: "telefon-vergisi-hesaplayici-samsung-galaxy-s23.jpg",
        pageTitle: "Samsung Galaxy S23'ün vergisi ne kadar?",
        pageDescription: "Samsung Galaxy S23'ün vergili ve vergisiz fiyatını hesaplayın, yurt içi ve yurt dışı fiyatlarını karşılaştırın.",
        options: [
            {
                title: "128GB (8GB)",
                form: { price: 799.99, currency: "USD" },
                retailPrice: {
                    value: 27999,
                    lastUpdatedDate: lastUpdatedDateSamsung,
                    sourceUrl: "https://shop.samsung.com/tr/galaxy-s23/"
                }
            },
            {
                title: "256GB (8GB)",
                form: { price: 859.99, currency: "USD" },
                retailPrice: {
                    value: 29999,
                    lastUpdatedDate: lastUpdatedDateSamsung,
                    sourceUrl: "https://shop.samsung.com/tr/galaxy-s23/"
                }
            }
        ]
    },
    {
        title: "Samsung Galaxy S23+",
        slug: "samsung-galaxy-s23-plus",
        url: buildUrl("samsung-galaxy-s23-plus"),
        icon: "samsung.svg",
        color: "#1428A0",
        ogImageName: "telefon-vergisi-hesaplayici-samsung-galaxy-s23-plus.jpg",
        pageTitle: "Samsung Galaxy S23+'ın vergisi ne kadar?",
        pageDescription: "Samsung Galaxy S23+'ın vergili ve vergisiz fiyatını hesaplayın, yurt içi ve yurt dışı fiyatlarını karşılaştırın.",
        options: [
            {
                title: "256GB (8GB)",
                form: { price: 999.99, currency: "USD" },
                retailPrice: {
                    value: 36999,
                    lastUpdatedDate: lastUpdatedDateSamsung,
                    sourceUrl: "https://shop.samsung.com/tr/galaxy-s23-plus/"
                }
            },
            {
                title: "512GB (8GB)",
                form: { price: 1119.99, currency: "USD" }
            }
        ]
    },
    {
        title: "Samsung Galaxy S23 Ultra",
        slug: "samsung-galaxy-s23-ultra",
        url: buildUrl("samsung-galaxy-s23-ultra"),
        icon: "samsung.svg",
        color: "#1428A0",
        ogImageName: "telefon-vergisi-hesaplayici-samsung-galaxy-s23-ultra.jpg",
        pageTitle: "Samsung Galaxy S23 Ultra'nın vergisi ne kadar?",
        pageDescription: "Samsung Galaxy S23 Ultra'nın vergili ve vergisiz fiyatını hesaplayın, yurt içi ve yurt dışı fiyatlarını karşılaştırın.",
        options: [
            {
                title: "256GB (8GB)",
                form: { price: 1199.99, currency: "USD" },
                retailPrice: {
                    value: 45999,
                    lastUpdatedDate: lastUpdatedDateSamsung,
                    sourceUrl: "https://shop.samsung.com/tr/galaxy-s23-ultra/"
                }
            },
            {
                title: "512GB (8GB)",
                form: { price: 1379.99, currency: "USD" },
                retailPrice: {
                    value: 48999,
                    lastUpdatedDate: lastUpdatedDateSamsung,
                    sourceUrl: "https://shop.samsung.com/tr/galaxy-s23-ultra/"
                }
            },
            {
                title: "1TB (12GB)",
                form: { price: 1619.99, currency: "USD" },
                retailPrice: {
                    value: 53999,
                    lastUpdatedDate: lastUpdatedDateSamsung,
                    sourceUrl: "https://shop.samsung.com/tr/galaxy-s23-ultra/"
                }
            }
        ]
    }
];

export default slug => {
    const preset = findCalculatorPresetBySlug(slug, presets);
    if (!preset) {
        return false;
    }

    const title = preset.pageTitle;
    const url = preset.url;
    const description = preset.pageDescription;
    const head = buildHeadTags({
        title,
        description,
        ogImageName: preset.ogImageName ?? "telefon-vergisi-hesaplayici.jpg"
    });
    const breadcrumbs = [
        ...TelefonVergisiHesaplayici.breadcrumbs,
        { title: preset.title, url }
    ];

    return {
        title,
        calculatorTitle: TelefonVergisiHesaplayici.title,
        url,
        description,
        head,
        breadcrumbs,
        preset
    };
};

export {
    presets
};
