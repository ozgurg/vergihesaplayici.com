import { buildHeadTags } from "@/utils/build-head-tags.js";
import KonsolVergisiHesaplayici from "@/data/pages/konsol-vergisi-hesaplayici.page.js";
import { findCalculatorPresetBySlug } from "@/utils/find-calculator-preset-by-slug.js";

const buildUrl = slug => `/konsol-vergisi-hesaplayici/${slug}/`;

const presets = [
    {
        title: "Xbox Series S",
        slug: "xbox-series-s",
        url: buildUrl("xbox-series-s"),
        options: [
            {
                title: "512GB",
                form: { price: 299, currency: "EUR" }
            }
        ]
    },
    {
        title: "Xbox Series X",
        slug: "xbox-series-x",
        url: buildUrl("xbox-series-x"),
        options: [
            {
                title: "1TB",
                form: { price: 499, currency: "EUR" }
            }
        ]
    },
    {
        title: "PlayStation 5",
        slug: "playstation-5",
        url: buildUrl("playstation-5"),
        options: [
            // https://blog.playstation.com/2022/08/25/ps5-price-to-increase-in-select-markets-due-to-global-economic-environment-including-high-inflation-rates/
            {
                title: "Disksiz (825GB)",
                form: { price: 449.99, currency: "EUR" }
            },
            {
                title: "Diskli (825GB)",
                form: { price: 549.99, currency: "EUR" }
            }
        ]
    },
    {
        title: "Nintendo Switch",
        slug: "nintendo-switch",
        url: buildUrl("nintendo-switch"),
        options: [
            // https://www.nintendo.com/store/hardware/systems/
            {
                title: "Lite (32GB)",
                form: { price: 199.99, currency: "USD" }
            },
            {
                title: "Original (32GB)",
                form: { price: 299, currency: "USD" }
            },
            {
                title: "OLED (64GB)",
                form: { price: 349.99, currency: "USD" }
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
    const description = "Satın aldığınız bir oyun konsolunun yurt içi ve yurt dışı fiyatlarına ne kadar vergi uygulandığını hesaplayın.";
    const head = buildHeadTags({
        title,
        description,
        ogImageName: preset.ogImageName ?? "konsol-vergisi-hesaplayici.jpg"
    });
    const breadcrumbs = [
        ...KonsolVergisiHesaplayici.breadcrumbs,
        { title: preset.title, url }
    ];

    return {
        title,
        calculatorTitle: KonsolVergisiHesaplayici.title,
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
