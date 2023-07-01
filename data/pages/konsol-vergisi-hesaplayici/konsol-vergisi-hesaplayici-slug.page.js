import { mdiApple, mdiMicrosoftXbox, mdiNintendoSwitch, mdiSonyPlaystation } from "@mdi/js";
import { buildHeadTags } from "@/utils/build-head-tags.js";
import KonsolVergisiHesaplayici from "@/data/pages/konsol-vergisi-hesaplayici/konsol-vergisi-hesaplayici.page.js";
import { findCalculatorPresetBySlug } from "@/utils/find-calculator-preset-by-slug.js";

const buildUrl = slug => `/konsol-vergisi-hesaplayici/${slug}/`;

const presets = [
    {
        title: "Xbox Series S",
        slug: "xbox-series-s",
        url: buildUrl("xbox-series-s"),
        icon: mdiMicrosoftXbox,
        color: "#107C10",
        ogImageName: "konsol-vergisi-hesaplayici-xbox-series-s.jpg",
        pageTitle: "Xbox Series S'nin vergisi ne kadar?",
        pageDescription: "Satın aldığınız bir Xbox Series S'nin yurt içi ve yurt dışı fiyatlarına ne kadar vergi uygulandığını hesaplayın.",
        options: [
            {
                // FIXME: Need official price
                title: "512GB",
                form: { price: 299, currency: "EUR" },
                retailPrice: {
                    value: 11499,
                    lastUpdatedDate: new Date("Sat Jul 01 2023 08:22:32 GMT+0300 (GMT+03:00)"),
                    sourceUrl: "https://www.overgameweb.com/xbox-series-s-512gb-konsol"
                }
            },
            {
                title: "1TB",
                form: { price: 349.99, currency: "EUR" }
            }
        ]
    },
    {
        title: "Xbox Series X",
        slug: "xbox-series-x",
        url: buildUrl("xbox-series-x"),
        icon: mdiMicrosoftXbox,
        color: "#107C10",
        ogImageName: "konsol-vergisi-hesaplayici-xbox-series-x.jpg",
        pageTitle: "Xbox Series X'in vergisi ne kadar?",
        pageDescription: "Satın aldığınız bir Xbox Series X'in yurt içi ve yurt dışı fiyatlarına ne kadar vergi uygulandığını hesaplayın.",
        options: [
            {
                // FIXME: Need official price
                title: "1TB",
                form: { price: 499, currency: "EUR" },
                retailPrice: {
                    value: 18999,
                    lastUpdatedDate: new Date("Tue Jun 06 2023 22:55:14 GMT+0300 (GMT+03:00)"),
                    sourceUrl: "https://www.vatanbilgisayar.com/microsoft-xbox-series-x-oyun-konsolu.html"
                }
            }
        ]
    },
    {
        title: "PlayStation 5",
        slug: "playstation-5",
        url: buildUrl("playstation-5"),
        icon: mdiSonyPlaystation,
        color: "#00439C",
        ogImageName: "konsol-vergisi-hesaplayici-playstation-5.jpg",
        pageTitle: "PlayStation 5'in vergisi ne kadar?",
        pageDescription: "Satın aldığınız bir PlayStation 5'in yurt içi ve yurt dışı fiyatlarına ne kadar vergi uygulandığını hesaplayın.",
        options: [
            {
                // FIXME: Need official price
                // https://blog.playstation.com/2022/08/25/ps5-price-to-increase-in-select-markets-due-to-global-economic-environment-including-high-inflation-rates/
                title: "Disksiz (825GB)",
                form: { price: 449.99, currency: "EUR" },
                retailPrice: {
                    value: 22999,
                    lastUpdatedDate: new Date("Sat Jul 01 2023 08:22:32 GMT+0300 (GMT+03:00)"),
                    sourceUrl: "https://www.vatanbilgisayar.com/sony-playstation-5-digital-surum-oyun-konsolu.html"
                }
            },
            {
                // FIXME: Need official price
                // FIXME: Need price without controller bundle
                // https://blog.playstation.com/2022/08/25/ps5-price-to-increase-in-select-markets-due-to-global-economic-environment-including-high-inflation-rates/
                title: "Diskli (825GB)",
                form: { price: 549.99, currency: "EUR" },
                retailPrice: {
                    value: 23999,
                    lastUpdatedDate: new Date("Sat Jul 01 2023 08:22:32 GMT+0300 (GMT+03:00)"),
                    sourceUrl: "https://www.overgameweb.com/playstation-5-diskli-dualsense-wireless-controller-bundle"
                }
            },
            {
                // FIXME: Need official price
                // https://blog.playstation.com/2022/11/02/playstation-vr2-launches-in-february-at-549-99/
                title: "PlayStation VR2",
                form: { price: 599.99, currency: "EUR" },
                retailPrice: {
                    value: 19299,
                    lastUpdatedDate: new Date("Tue Jun 06 2023 22:55:14 GMT+0300 (GMT+03:00)"),
                    sourceUrl: "https://www.overgameweb.com/sony-playstation-vr2-sanal-gerceklik-gozlugu-ve-vr2-sense-charging-station"
                }
            }
        ]
    },
    {
        title: "Nintendo Switch",
        slug: "nintendo-switch",
        url: buildUrl("nintendo-switch"),
        icon: mdiNintendoSwitch,
        color: "#e60012",
        ogImageName: "konsol-vergisi-hesaplayici-nintendo-switch.jpg",
        pageTitle: "Nintendo Switch'in vergisi ne kadar?",
        pageDescription: "Satın aldığınız bir Nintendo Switch'in yurt içi ve yurt dışı fiyatlarına ne kadar vergi uygulandığını hesaplayın.",
        options: [
            // https://www.nintendo.com/store/hardware/systems/
            {
                // FIXME: Need official price
                title: "Lite (32GB)",
                form: { price: 199.99, currency: "USD" },
                retailPrice: {
                    value: 7999,
                    lastUpdatedDate: new Date("Tue Jun 06 2023 22:55:14 GMT+0300 (GMT+03:00)"),
                    sourceUrl: "https://www.overgameweb.com/nintendo-switch-lite-konsol-turkuaz"
                }
            },
            {
                // FIXME: Need official price
                title: "Original (32GB)",
                form: { price: 299, currency: "USD" },
                retailPrice: {
                    value: 8499,
                    lastUpdatedDate: new Date("Tue Jun 06 2023 22:55:14 GMT+0300 (GMT+03:00)"),
                    sourceUrl: "https://www.overgameweb.com/nintendo-switch-konsol-gri-gelistirilmis-pil"
                }
            },
            {
                // FIXME: Need official price
                title: "OLED (64GB)",
                form: { price: 349.99, currency: "USD" },
                retailPrice: {
                    value: 12999,
                    lastUpdatedDate: new Date("Tue Jun 06 2023 22:55:14 GMT+0300 (GMT+03:00)"),
                    sourceUrl: "https://www.overgameweb.com/nintendo-switch-konsol-oled-edition-neon"
                }
            }
        ]
    },
    {
        title: "Apple Vision Pro",
        slug: "apple-vision-pro",
        url: buildUrl("apple-vision-pro"),
        icon: mdiApple,
        color: "#555",
        ogImageName: "konsol-vergisi-hesaplayici-apple-vision-pro.jpg",
        pageTitle: "Apple Vision Pro'nun vergisi ne kadar?",
        pageDescription: "Apple Vision Pro'nun vergili ve vergisiz fiyatını hesaplayın, yurt içi ve yurt dışı fiyatlarını karşılaştırın.",
        options: [
            {
                title: "Standart",
                form: { price: 3499, currency: "USD" }
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
