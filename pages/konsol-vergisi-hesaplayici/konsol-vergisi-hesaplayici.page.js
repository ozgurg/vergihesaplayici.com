import { mdiController } from "@mdi/js";
import { buildHeadTags } from "@/utils/build-head-tags.js";
import parentPage from "@/pages/hesaplayicilar/hesaplayicilar.page.js";

const presets = [
    // PS5: https://blog.playstation.com/2022/08/25/ps5-price-to-increase-in-select-markets-due-to-global-economic-environment-including-high-inflation-rates/
    // Nintendo Switch: https://en.wikipedia.org/wiki/Nintendo_Switch#cite_note-polygon_oled_announce-178
    { id: 1, title: "Xbox Series S (512GB)", form: { price: 299, currency: "EUR" } },
    { id: 2, title: "Xbox Series X (1TB)", form: { price: 499, currency: "EUR" } },
    { id: 3, title: "PlayStation 5 Digital Edition (825GB)", form: { price: 449.99, currency: "EUR" } },
    { id: 4, title: "PlayStation 5 (825GB)", form: { price: 549.99, currency: "EUR" } },
    { id: 5, title: "Nintendo Switch OLED (64GB)", form: { price: 349.99, currency: "USD" } }
];

export default (() => {
    const icon = mdiController;
    const title = "Konsol Vergisi Hesaplayıcı";
    const shortTitle = "Konsol Vergisi";
    const description = "Satın aldığınız bir oyun konsolunun yurt içi ve yurt dışı fiyatlarına ne kadar vergi uygulandığını hesaplayın.";
    const url = "/konsol-vergisi-hesaplayici/";
    const head = buildHeadTags({
        title,
        description,
        ogImageName: "konsol-vergisi-hesaplayici.jpg"
    });
    const breadcrumbs = [
        ...parentPage.breadcrumbs,
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
