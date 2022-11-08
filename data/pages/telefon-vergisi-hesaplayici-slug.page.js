import { buildHeadTags } from "@/utils/build-head-tags.js";
import TelefonVergisiHesaplayici from "@/data/pages/telefon-vergisi-hesaplayici.page.js";
import { findCalculatorPresetBySlug } from "@/utils/find-calculator-preset-by-slug.js";

const buildUrl = slug => `/telefon-vergisi-hesaplayici/${slug}/`;

const presets = [
    {
        title: "iPhone SE (2022)",
        description: "iPhone SE (2022)'nin yurt içi ve yurt dışı fiyatlarına ne kadar vergi uygulandığını hesaplayın.",
        slug: "iphone-se-2022",
        url: buildUrl("iphone-se-2022"),
        ogImageName: "telefon-vergisi-hesaplayici-iphone-se-2022.jpg",
        options: [
            {
                title: "64GB",
                form: { price: 429, currency: "USD" }
            },
            {
                title: "128GB",
                form: { price: 479, currency: "USD" }
            },
            {
                title: "256GB",
                form: { price: 579, currency: "USD" }
            }
        ]
    },
    {
        title: "iPhone 14",
        description: "iPhone 14'ün yurt içi ve yurt dışı fiyatlarına ne kadar vergi uygulandığını hesaplayın.",
        slug: "iphone-14",
        url: buildUrl("iphone-14"),
        ogImageName: "telefon-vergisi-hesaplayici-iphone-14.jpg",
        options: [
            {
                title: "128GB",
                form: { price: 799, currency: "USD" }
            },
            {
                title: "256GB",
                form: { price: 899, currency: "USD" }
            },
            {
                title: "512GB",
                form: { price: 1099, currency: "USD" }
            }
        ]
    },
    {
        title: "iPhone 14 Plus",
        description: "iPhone 14 Plus'ın yurt içi ve yurt dışı fiyatlarına ne kadar vergi uygulandığını hesaplayın.",
        slug: "iphone-14-plus",
        url: buildUrl("iphone-14-plus"),
        ogImageName: "telefon-vergisi-hesaplayici-iphone-14-plus.jpg",
        options: [
            {
                title: "128GB",
                form: { price: 899, currency: "USD" }
            },
            {
                title: "256GB",
                form: { price: 999, currency: "USD" }
            },
            {
                title: "512GB",
                form: { price: 1199, currency: "USD" }
            }
        ]
    },
    {
        title: "iPhone 14 Pro",
        description: "iPhone 14 Pro'nun yurt içi ve yurt dışı fiyatlarına ne kadar vergi uygulandığını hesaplayın.",
        slug: "iphone-14-pro",
        url: buildUrl("iphone-14-pro"),
        ogImageName: "telefon-vergisi-hesaplayici-iphone-14-pro.jpg",
        options: [
            {
                title: "128GB",
                form: { price: 999, currency: "USD" }
            },
            {
                title: "256GB",
                form: { price: 1099, currency: "USD" }
            },
            {
                title: "512GB",
                form: { price: 1299, currency: "USD" }
            },
            {
                title: "1TB",
                form: { price: 1499, currency: "USD" }
            }
        ]
    },
    {
        title: "iPhone 14 Pro Max",
        description: "iPhone 14 Pro Max'in yurt içi ve yurt dışı fiyatlarına ne kadar vergi uygulandığını hesaplayın.",
        slug: "iphone-14-pro-max",
        url: buildUrl("iphone-14-pro-max"),
        ogImageName: "telefon-vergisi-hesaplayici-iphone-14-pro-max.jpg",
        options: [
            {
                title: "128GB",
                form: { price: 1099, currency: "USD" }
            },
            {
                title: "256GB",
                form: { price: 1199, currency: "USD" }
            },
            {
                title: "512GB",
                form: { price: 1399, currency: "USD" }
            },
            {
                title: "1TB",
                form: { price: 1599, currency: "USD" }
            }
        ]
    }
];

export default slug => {
    const preset = findCalculatorPresetBySlug(slug, presets);
    if (!preset) {
        return false;
    }

    const title = `${preset.title} vergisi ne kadar?`;
    const url = preset.url;
    const description = preset.description;
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
