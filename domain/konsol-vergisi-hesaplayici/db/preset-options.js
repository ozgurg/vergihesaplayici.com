/** @type {KonsolVergisiHesaplayiciPresetOption[]} */
const presetOptions = [
    // [23] Sony PlayStation 5 Pro
    {
        presetId: 23,
        title: "Disksiz",
        form: { // https://www.youtube.com/live/X24BzyzQQ-8?t=1096
            price: 799.99,
            currency: "EUR"
        }
    },


    // [14] Sony PlayStation 5
    {
        presetId: 14,
        title: "Disksiz (Slim)",
        form: { // https://blog.playstation.com/2022/08/25/ps5-price-to-increase-in-select-markets-due-to-global-economic-environment-including-high-inflation-rates/
            price: 449.99,
            currency: "EUR"
        },
        retailPrice: {
            value: 24999,
            lastUpdatedDate: new Date("Tue Mar 05 2024 20:13:15 GMT+0300 (GMT+03:00)"),
            sourceUrl: "https://twitter.com/Ersinklc/status/1760234205739405588"
        }
    },
    {
        presetId: 14,
        title: "Diskli (Slim)",
        form: { // https://blog.playstation.com/2022/08/25/ps5-price-to-increase-in-select-markets-due-to-global-economic-environment-including-high-inflation-rates/
            price: 549.99,
            currency: "EUR"
        },
        retailPrice: {
            value: 27999,
            lastUpdatedDate: new Date("Tue Mar 05 2024 20:13:15 GMT+0300 (GMT+03:00)"),
            sourceUrl: "https://twitter.com/Ersinklc/status/1760234205739405588"
        }
    },

    // [15] Sony PlayStation VR2
    {
        presetId: 15,
        title: "Standart",
        form: { // https://blog.playstation.com/2022/11/02/playstation-vr2-launches-in-february-at-549-99/
            price: 599.99,
            currency: "EUR"
        }
    },

    // [22] Sony PlayStation Portal
    {
        presetId: 22,
        title: "Standart",
        form: { // https://blog.playstation.com/2023/08/23/playstations-first-remote-play-dedicated-device-playstation-portal-remote-player-to-launch-later-this-year-at-199-99/
            price: 219.99,
            currency: "EUR"
        },
        retailPrice: {
            value: 11999,
            lastUpdatedDate: new Date("Tue Mar 05 2024 20:13:15 GMT+0300 (GMT+03:00)"),
            sourceUrl: "https://twitter.com/Ersinklc/status/1760223698311680478"
        }
    },


    // [16] Microsoft Xbox Series S
    {
        presetId: 16,
        title: "512GB",
        form: {
            price: 299,
            currency: "EUR"
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
            lastUpdatedDate: new Date("Tue Mar 05 2024 20:13:15 GMT+0300 (GMT+03:00)"),
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

export default presetOptions;
