const calculators = {
    /* VatCalculator: {
        icon: "mdi-label-percent",
        initialsTitle: "KDV",
        title: "KDV (Katma Değer Vergisi) Hesaplayıcı",
        subtitle: "Katma Değer Vergisi",
        url: "/hesaplayicilar/kdv-hesaplayici",
        description: "Namıdiğer her şeyin vergisini dahil ve hariç olarak hesaplayın."
    }, */
    ConsoleTaxCalculator: {
        icon: "mdi-gamepad",
        title: "Konsol Vergisi Hesaplayıcı",
        subtitle: "Konsol Vergisi",
        url: "/hesaplayicilar/konsol-vergisi-hesaplayici",
        description: "Sadece eğlenmek istediğinizde ödemeniz gereken vergileri hesaplayın."
    },
    PhoneTaxCalculator: {
        icon: "mdi-cellphone",
        title: "Telefon Vergisi Hesaplayıcı",
        subtitle: "Telefon Vergisi",
        url: "/hesaplayicilar/telefon-vergisi-hesaplayici",
        description: "Satın aldığınız bir telefonun satış fiyatına etki eden vergileri hesaplayın."
    }
};

module.exports = calculators;
