import { mdiCellphone, mdiGamepad, mdiLabelPercent } from "@mdi/js";

const VatCalculator = {
    icon: mdiLabelPercent,
    initialsTitle: "KDV",
    title: "KDV (Katma Değer Vergisi) Hesaplayıcı",
    subtitle: "Katma Değer Vergisi",
    url: "/hesaplayicilar/kdv-hesaplayici/",
    description: "Namıdiğer her şeyin vergisini hariç ve dahil olarak hesaplayın."
};

const ConsoleTaxCalculator = {
    icon: mdiGamepad,
    title: "Konsol Vergisi Hesaplayıcı",
    subtitle: "Konsol Vergisi",
    url: "/hesaplayicilar/konsol-vergisi-hesaplayici/",
    description: "Sadece eğlenmek istediğinizde ödemeniz gereken vergileri hesaplayın."
};

const PhoneTaxCalculator = {
    icon: mdiCellphone,
    title: "Telefon Vergisi Hesaplayıcı",
    subtitle: "Telefon Vergisi",
    url: "/hesaplayicilar/telefon-vergisi-hesaplayici/",
    description: "Satın aldığınız bir telefonun satış fiyatına etki eden vergileri hesaplayın."
};

export {
    VatCalculator,
    ConsoleTaxCalculator,
    PhoneTaxCalculator
};
