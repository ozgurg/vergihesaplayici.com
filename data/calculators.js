const calculators = {};

calculators["VatCalculator"] = {
    "icon": "mdi-label-percent",
    "shortTitle": "Katma Değer Vergisi (KDV)",
    "title": "Katma Değer Vergisi (KDV) Hesaplayıcı",
    "url": "/hesaplayicilar/kdv-hesaplayici",
    "description": "Namıdiğer her şeyin vergisini dahil ve hariç olarak hesaplayın."
};

calculators["ConsoleTaxCalculator"] = {
    "icon": "mdi-gamepad",
    "shortTitle": "Konsol Vergisi",
    "title": "Konsol Vergisi Hesaplayıcı",
    "url": "/hesaplayicilar/konsol-vergisi-hesaplayici",
    "description": "Sadece eğlenmek istediğinizde ödemeniz gereken vergileri hesaplayın."
};

calculators["PhoneTaxCalculator"] = {
    "icon": "mdi-cellphone",
    "shortTitle": "Telefon Vergisi",
    "title": "Telefon Vergisi Hesaplayıcı",
    "url": "/hesaplayicilar/telefon-vergisi-hesaplayici",
    "description": "Satın aldığınız bir telefonun satış fiyatına etki eden vergileri hesaplayın."
};

module.exports = calculators;
