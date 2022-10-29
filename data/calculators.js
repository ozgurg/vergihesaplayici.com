import { mdiBrightnessPercent, mdiCellphone, mdiController } from "@mdi/js";

const VatCalculator = {
    icon: mdiBrightnessPercent,
    initialsTitle: "KDV",
    title: "KDV (Katma Değer Vergisi) Hesaplayıcı",
    subtitle: "Katma Değer Vergisi",
    url: "/hesaplayicilar/kdv-hesaplayici/",
    description: "Namıdiğer her şeyin vergisini hariç ve dahil olarak hesaplayın.",
    summary: "\"Her şey değerlidir.\"<br /><i>- Katma Değer Vergisi</i>"
};

const ConsoleTaxCalculator = {
    icon: mdiController,
    title: "Konsol Vergisi Hesaplayıcı",
    subtitle: "Konsol Vergisi",
    url: "/hesaplayicilar/konsol-vergisi-hesaplayici/",
    description: "Sadece eğlenmek istediğinizde ödemeniz gereken vergileri hesaplayın.",
    summary: "- Oyun oynamak hiç bu kadar vergili olmamıştı.<br />+ Meydan okuma kabul edildi.",
    presets: [
        // PS5: https://blog.playstation.com/2022/08/25/ps5-price-to-increase-in-select-markets-due-to-global-economic-environment-including-high-inflation-rates/
        // Nintendo Switch: https://en.wikipedia.org/wiki/Nintendo_Switch#cite_note-polygon_oled_announce-178
        { id: 1, title: "Xbox Series S (512GB)", form: { price: 299, currency: "EUR" } },
        { id: 2, title: "Xbox Series X (1TB)", form: { price: 499, currency: "EUR" } },
        { id: 3, title: "PlayStation 5 Digital Edition (825GB)", form: { price: 449.99, currency: "EUR" } },
        { id: 4, title: "PlayStation 5 (825GB)", form: { price: 549.99, currency: "EUR" } },
        { id: 5, title: "Nintendo Switch OLED (64GB)", form: { price: 349.99, currency: "USD" } }
    ]
};

const PhoneTaxCalculator = {
    icon: mdiCellphone,
    title: "Telefon Vergisi Hesaplayıcı",
    subtitle: "Telefon Vergisi",
    url: "/hesaplayicilar/telefon-vergisi-hesaplayici/",
    description: "Satın aldığınız bir telefonun satış fiyatına etki eden vergileri hesaplayın.",
    summary: "\"O ney vatandaş, bir tane de bana ver\"<br /><i>- Vergili Mıçı</i>",
    presets: [
        { id: 1, title: "iPhone SE 2022 (64GB)", form: { price: 429, currency: "USD" } },
        { id: 2, title: "iPhone 14 (128GB)", form: { price: 799, currency: "USD" } },
        { id: 3, title: "iPhone 14 Plus (128GB)", form: { price: 899, currency: "USD" } },
        { id: 4, title: "iPhone 14 Pro (128GB)", form: { price: 999, currency: "USD" } },
        { id: 5, title: "iPhone 14 Pro Max (1TB)", form: { price: 1599, currency: "USD" } }
    ]
};

export {
    VatCalculator,
    ConsoleTaxCalculator,
    PhoneTaxCalculator
};
