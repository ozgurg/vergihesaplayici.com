export default [
    // [14] Sony PlayStation 5
    {
        // FIXME: Need official price
        // https://blog.playstation.com/2022/08/25/ps5-price-to-increase-in-select-markets-due-to-global-economic-environment-including-high-inflation-rates/
        presetId: 14,
        title: "Disksiz",
        form: {
            price: 449.99,
            currency: "EUR"
        },
        retailPrice: {
            value: 23399,
            lastUpdatedDate: new Date("Sun Jul 16 2023 16:31:44 GMT+0300 (GMT+03:00)"),
            sourceUrl: "https://www.vatanbilgisayar.com/sony-playstation-5-digital-surum-oyun-konsolu.html"
        }
    },
    {
        // FIXME: Need official price
        // FIXME: Need price without controller bundle
        // https://blog.playstation.com/2022/08/25/ps5-price-to-increase-in-select-markets-due-to-global-economic-environment-including-high-inflation-rates/
        presetId: 14,
        title: "Diskli",
        form: {
            price: 549.99,
            currency: "EUR"
        },
        retailPrice: {
            value: 23999,
            lastUpdatedDate: new Date("Sat Jul 01 2023 08:22:32 GMT+0300 (GMT+03:00)"),
            sourceUrl: "https://www.overgameweb.com/playstation-5-diskli-dualsense-wireless-controller-bundle"
        }
    },

    // [15] Sony PlayStation VR2
    {
        // FIXME: Need official price
        // https://blog.playstation.com/2022/11/02/playstation-vr2-launches-in-february-at-549-99/
        presetId: 15,
        title: "Standart",
        form: {
            price: 599.99,
            currency: "EUR"
        },
        retailPrice: {
            value: 19626,
            lastUpdatedDate: new Date("Sun Jul 16 2023 16:31:44 GMT+0300 (GMT+03:00)"),
            sourceUrl: "https://www.overgameweb.com/sony-playstation-vr2-sanal-gerceklik-gozlugu-ve-vr2-sense-charging-station"
        }
    },


    // [16] Microsoft Xbox Series S
    {
        // FIXME: Need official price
        presetId: 16,
        title: "512GB",
        form: {
            price: 299,
            currency: "EUR"
        },
        retailPrice: {
            value: 11694,
            lastUpdatedDate: new Date("Sun Jul 16 2023 16:31:44 GMT+0300 (GMT+03:00)"),
            sourceUrl: "https://www.overgameweb.com/xbox-series-s-512gb-konsol"
        }
    },
    {
        presetId: 16,
        title: "1TB",
        form: {
            price: 349.99,
            currency: "EUR"
        }
    },

    // [17] Microsoft Xbox Series X
    {
        // FIXME: Need official price
        presetId: 17,
        title: "1TB",
        form: {
            price: 499,
            currency: "EUR"
        },
        retailPrice: {
            value: 18999,
            lastUpdatedDate: new Date("Tue Jun 06 2023 22:55:14 GMT+0300 (GMT+03:00)"),
            sourceUrl: "https://www.vatanbilgisayar.com/microsoft-xbox-series-x-oyun-konsolu.html"
        }
    },


    // [18] Nintendo Switch (https://www.nintendo.com/store/hardware/systems/)
    {
        // FIXME: Need official price
        presetId: 18,
        title: "32GB",
        form: {
            price: 299,
            currency: "USD"
        },
        retailPrice: {
            value: 8643,
            lastUpdatedDate: new Date("Sun Jul 16 2023 16:31:44 GMT+0300 (GMT+03:00)"),
            sourceUrl: "https://www.overgameweb.com/nintendo-switch-konsol-gri-gelistirilmis-pil"
        }
    },

    // [19] Nintendo Switch Lite (https://www.nintendo.com/store/hardware/systems/)
    {
        // FIXME: Need official price
        presetId: 19,
        title: "Lite (32GB)",
        form: {
            price: 199.99,
            currency: "USD"
        },
        retailPrice: {
            value: 8135,
            lastUpdatedDate: new Date("Sun Jul 16 2023 16:31:44 GMT+0300 (GMT+03:00)"),
            sourceUrl: "https://www.overgameweb.com/nintendo-switch-lite-konsol-turkuaz"
        }
    },

    // [20] Nintendo Switch OLED (https://www.nintendo.com/store/hardware/systems/)
    {
        // FIXME: Need official price
        presetId: 20,
        title: "OLED (64GB)",
        form: {
            price: 349.99,
            currency: "USD"
        },
        retailPrice: {
            value: 13219,
            lastUpdatedDate: new Date("Sun Jul 16 2023 16:31:44 GMT+0300 (GMT+03:00)"),
            sourceUrl: "https://www.overgameweb.com/nintendo-switch-konsol-oled-edition-neon"
        }
    },


    // [21] Valve Steam Deck (https://store.steampowered.com/steamdeck)
    {
        presetId: 21,
        title: "64GBB",
        form: {
            price: 399,
            currency: "USD"
        }
    },
    {
        presetId: 21,
        title: "256GBB",
        form: {
            price: 529,
            currency: "USD"
        }
    },
    {
        presetId: 21,
        title: "512GBB",
        form: {
            price: 649,
            currency: "USD"
        }
    }
];
