import { mdiController } from "@mdi/js";
import { buildHeadTags } from "@/utils/build-head-tags.js";
import KonsolVergisiHesaplayici from "@/data/pages/konsol-vergisi-hesaplayici.page.js";

const presets = [
    {
        title: "Xbox Series S",
        slug: "xbox-series-s",
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
        options: [
            {
                title: "1TB",
                form: { price: 499, currency: "EUR" }
            }
        ]
    },
    { // https://blog.playstation.com/2022/08/25/ps5-price-to-increase-in-select-markets-due-to-global-economic-environment-including-high-inflation-rates/
        title: "PlayStation 5",
        slug: "playstation-5",
        options: [
            {
                title: "Digital Edition (825GB)",
                form: { price: 449.99, currency: "EUR" }
            },
            {
                title: "825GB",
                form: { price: 549.99, currency: "EUR" }
            }
        ]
    },
    {
        // https://en.wikipedia.org/wiki/Nintendo_Switch#cite_note-polygon_oled_announce-178
        title: "Nintendo Switch",
        slug: "nintendo-switch",
        options: [
            {
                title: "OLED (64GB)",
                form: { price: 349.99, currency: "USD" }
            }
        ]
    }
];

export default (() => {
    const icon = mdiController;
    const title = "Konsol Vergisi Hesaplayıcı";
    const shortTitle = "Konsol Vergisi";
    const description = "Satın aldığınız bir oyun konsolunun yurt içi ve yurt dışı fiyatlarına ne kadar vergi uygulandığını hesaplayın.";
    const url = "/hesaplayicilar/konsol-vergisi-hesaplayici/";
    const head = buildHeadTags({
        title,
        description,
        ogImageName: "konsol-vergisi-hesaplayici.jpg"
    });
    const breadcrumbs = [
        ...KonsolVergisiHesaplayici.breadcrumbs,
        { title, url }
    ];
    const summary = "- Oyun oynamak hiç bu kadar vergili olmamıştı.<br />+ Meydan okuma kabul edildi.";

    return {
        icon,
        title,
        shortTitle,
        description,
        url,
        head,
        breadcrumbs,
        summary
    };
})();

export {
    presets
};
