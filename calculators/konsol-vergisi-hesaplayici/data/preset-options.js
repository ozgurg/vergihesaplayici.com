export default [
    // [14] Sony PlayStation 5
    {
        // https://blog.playstation.com/2022/08/25/ps5-price-to-increase-in-select-markets-due-to-global-economic-environment-including-high-inflation-rates/
        presetId: 14,
        title: "Disksiz (Fat/Slim)",
        form: {
            price: 449.99,
            currency: "EUR"
        }
    },
    {
        // https://blog.playstation.com/2022/08/25/ps5-price-to-increase-in-select-markets-due-to-global-economic-environment-including-high-inflation-rates/
        presetId: 14,
        title: "Diskli (Fat/Slim)",
        form: {
            price: 549.99,
            currency: "EUR"
        }
    },

    // [15] Sony PlayStation VR2
    {
        // https://blog.playstation.com/2022/11/02/playstation-vr2-launches-in-february-at-549-99/
        presetId: 15,
        title: "Standart",
        form: {
            price: 599.99,
            currency: "EUR"
        }
    },


    // [16] Microsoft Xbox Series S
    {
        presetId: 16,
        title: "512GB",
        form: {
            price: 299,
            currency: "EUR"
        },
        retailPrice: { // FIXME: Need official retail price
            value: 13999,
            lastUpdatedDate: new Date("Tue Jan 02 2024 21:29:27 GMT+0300 (GMT+03:00)"),
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
        presetId: 17,
        title: "1TB",
        form: {
            price: 499,
            currency: "EUR"
        },
        retailPrice: {
            value: 25999,
            lastUpdatedDate: new Date("Tue Jan 02 2024 21:29:27 GMT+0300 (GMT+03:00)"),
            sourceUrl: "https://www.overgameweb.com/microsoft-xbox-series-x-black-1-tb-konsol"
        }
    },


    // [18] Nintendo Switch (https://www.nintendo.com/store/hardware/systems/)
    {
        presetId: 18,
        title: "32GB",
        form: {
            price: 299,
            currency: "USD"
        }
    },

    // [19] Nintendo Switch Lite (https://www.nintendo.com/store/hardware/systems/)
    {
        presetId: 19,
        title: "Lite (32GB)",
        form: {
            price: 199.99,
            currency: "USD"
        }
    },

    // [20] Nintendo Switch OLED (https://www.nintendo.com/store/hardware/systems/)
    {
        presetId: 20,
        title: "OLED (64GB)",
        form: {
            price: 349.99,
            currency: "USD"
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
