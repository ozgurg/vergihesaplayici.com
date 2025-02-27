const lastUpdatedDateIphone = new Date("Thu Feb 27 2025 03:50:26 GMT+0300 (GMT+03:00)");
// const lastUpdatedDateSamsung = new Date("Thu Feb 27 2025 03:50:26 GMT+0300 (GMT+03:00)");

/** @type {TelefonVergisiHesaplayiciPresetOption[]} */
const presetOptions = [
    // [26] Apple iPhone 16e
    {
        presetId: 26,
        title: "128GB",
        form: {
            price: 599,
            currency: "USD"
        },
        retailPrice: {
            value: 47999,
            lastUpdatedDate: lastUpdatedDateIphone,
            sourceUrl: "https://www.apple.com/tr/shop/buy-iphone/iphone-16e"
        }
    },
    {
        presetId: 26,
        title: "256GB",
        form: {
            price: 699,
            currency: "USD"
        },
        retailPrice: {
            value: 52999,
            lastUpdatedDate: lastUpdatedDateIphone,
            sourceUrl: "https://www.apple.com/tr/shop/buy-iphone/iphone-16e"
        }
    },
    {
        presetId: 26,
        title: "512GB",
        form: {
            price: 899,
            currency: "USD"
        },
        retailPrice: {
            value: 62999,
            lastUpdatedDate: lastUpdatedDateIphone,
            sourceUrl: "https://www.apple.com/tr/shop/buy-iphone/iphone-16e"
        }
    },


    // [22] Apple iPhone 16 Pro
    {
        presetId: 22,
        title: "128GB",
        form: {
            price: 999,
            currency: "USD"
        },
        retailPrice: {
            value: 82999,
            lastUpdatedDate: lastUpdatedDateIphone,
            sourceUrl: "https://www.apple.com/tr/shop/buy-iphone/iphone-16-pro"
        }
    },
    {
        presetId: 22,
        title: "256GB",
        form: {
            price: 1099,
            currency: "USD"
        },
        retailPrice: {
            value: 87999,
            lastUpdatedDate: lastUpdatedDateIphone,
            sourceUrl: "https://www.apple.com/tr/shop/buy-iphone/iphone-16-pro"
        }
    },
    {
        presetId: 22,
        title: "512GB",
        form: {
            price: 1299,
            currency: "USD"
        },
        retailPrice: {
            value: 97999,
            lastUpdatedDate: lastUpdatedDateIphone,
            sourceUrl: "https://www.apple.com/tr/shop/buy-iphone/iphone-16-pro"
        }
    },
    {
        presetId: 22,
        title: "1TB",
        form: {
            price: 1499,
            currency: "USD"
        },
        retailPrice: {
            value: 107999,
            lastUpdatedDate: lastUpdatedDateIphone,
            sourceUrl: "https://www.apple.com/tr/shop/buy-iphone/iphone-16-pro"
        }
    },


    // [23] Apple iPhone 16 Pro Max
    {
        presetId: 23,
        title: "256GB",
        form: {
            price: 1199,
            currency: "USD"
        },
        retailPrice: {
            value: 99999,
            lastUpdatedDate: lastUpdatedDateIphone,
            sourceUrl: "https://www.apple.com/tr/shop/buy-iphone/iphone-16-pro"
        }
    },
    {
        presetId: 23,
        title: "512GB",
        form: {
            price: 1399,
            currency: "USD"
        },
        retailPrice: {
            value: 109999,
            lastUpdatedDate: lastUpdatedDateIphone,
            sourceUrl: "https://www.apple.com/tr/shop/buy-iphone/iphone-16-pro"
        }
    },
    {
        presetId: 23,
        title: "1TB",
        form: {
            price: 1599,
            currency: "USD"
        },
        retailPrice: {
            value: 119999,
            lastUpdatedDate: lastUpdatedDateIphone,
            sourceUrl: "https://www.apple.com/tr/shop/buy-iphone/iphone-16-pro"
        }
    },


    // [24] Apple iPhone 16
    {
        presetId: 24,
        title: "128GB",
        form: {
            price: 799,
            currency: "USD"
        },
        retailPrice: {
            value: 64999,
            lastUpdatedDate: lastUpdatedDateIphone,
            sourceUrl: "https://www.apple.com/tr/shop/buy-iphone/iphone-16"
        }
    },
    {
        presetId: 24,
        title: "256GB",
        form: {
            price: 899,
            currency: "USD"
        },
        retailPrice: {
            value: 69999,
            lastUpdatedDate: lastUpdatedDateIphone,
            sourceUrl: "https://www.apple.com/tr/shop/buy-iphone/iphone-16"
        }
    },
    {
        presetId: 24,
        title: "512GB",
        form: {
            price: 1099,
            currency: "USD"
        },
        retailPrice: {
            value: 79999,
            lastUpdatedDate: lastUpdatedDateIphone,
            sourceUrl: "https://www.apple.com/tr/shop/buy-iphone/iphone-16"
        }
    },


    // [25] Apple iPhone 16 Plus
    {
        presetId: 25,
        title: "128GB",
        form: {
            price: 899,
            currency: "USD"
        },
        retailPrice: {
            value: 73999,
            lastUpdatedDate: lastUpdatedDateIphone,
            sourceUrl: "https://www.apple.com/tr/shop/buy-iphone/iphone-16"
        }
    },
    {
        presetId: 25,
        title: "256GB",
        form: {
            price: 999,
            currency: "USD"
        },
        retailPrice: {
            value: 78999,
            lastUpdatedDate: lastUpdatedDateIphone,
            sourceUrl: "https://www.apple.com/tr/shop/buy-iphone/iphone-16"
        }
    },
    {
        presetId: 25,
        title: "512GB",
        form: {
            price: 1199,
            currency: "USD"
        },
        retailPrice: {
            value: 88999,
            lastUpdatedDate: lastUpdatedDateIphone,
            sourceUrl: "https://www.apple.com/tr/shop/buy-iphone/iphone-16"
        }
    },


    // [17] Apple iPhone 15 Pro
    {
        presetId: 17,
        title: "128GB",
        form: {
            price: 999,
            currency: "USD"
        }
    },
    {
        presetId: 17,
        title: "256GB",
        form: {
            price: 1099,
            currency: "USD"
        }
    },
    {
        presetId: 17,
        title: "512GB",
        form: {
            price: 1299,
            currency: "USD"
        }
    },
    {
        presetId: 17,
        title: "1TB",
        form: {
            price: 1499,
            currency: "USD"
        }
    },


    // [18] Apple iPhone 15 Pro Max
    {
        presetId: 18,
        title: "256GB",
        form: {
            price: 1199,
            currency: "USD"
        }
    },
    {
        presetId: 18,
        title: "512GB",
        form: {
            price: 1399,
            currency: "USD"
        }
    },
    {
        presetId: 18,
        title: "1TB",
        form: {
            price: 1599,
            currency: "USD"
        }
    },


    // [19] Apple iPhone 15
    {
        presetId: 19,
        title: "128GB",
        form: {
            price: 699,
            currency: "USD"
        },
        retailPrice: {
            value: 56999,
            lastUpdatedDate: lastUpdatedDateIphone,
            sourceUrl: "https://www.apple.com/tr/shop/buy-iphone/iphone-15"
        }
    },
    {
        presetId: 19,
        title: "256GB",
        form: {
            price: 799,
            currency: "USD"
        },
        retailPrice: {
            value: 61999,
            lastUpdatedDate: lastUpdatedDateIphone,
            sourceUrl: "https://www.apple.com/tr/shop/buy-iphone/iphone-15"
        }
    },
    {
        presetId: 19,
        title: "512GB",
        form: {
            price: 999,
            currency: "USD"
        },
        retailPrice: {
            value: 71999,
            lastUpdatedDate: lastUpdatedDateIphone,
            sourceUrl: "https://www.apple.com/tr/shop/buy-iphone/iphone-15"
        }
    },


    // [20] Apple iPhone 15 Plus
    {
        presetId: 20,
        title: "128GB",
        form: {
            price: 799,
            currency: "USD"
        },
        retailPrice: {
            value: 64999,
            lastUpdatedDate: lastUpdatedDateIphone,
            sourceUrl: "https://www.apple.com/tr/shop/buy-iphone/iphone-15"
        }
    },
    {
        presetId: 20,
        title: "256GB",
        form: {
            price: 899,
            currency: "USD"
        },
        retailPrice: {
            value: 69999,
            lastUpdatedDate: lastUpdatedDateIphone,
            sourceUrl: "https://www.apple.com/tr/shop/buy-iphone/iphone-15"
        }
    },
    {
        presetId: 20,
        title: "512GB",
        form: {
            price: 1099,
            currency: "USD"
        },
        retailPrice: {
            value: 79999,
            lastUpdatedDate: lastUpdatedDateIphone,
            sourceUrl: "https://www.apple.com/tr/shop/buy-iphone/iphone-15"
        }
    },


    // [1] Apple iPhone 14 Pro
    {
        presetId: 1,
        title: "128GB",
        form: {
            price: 999,
            currency: "USD"
        }
    },
    {
        presetId: 1,
        title: "256GB",
        form: {
            price: 1099,
            currency: "USD"
        }
    },
    {
        presetId: 1,
        title: "512GB",
        form: {
            price: 1299,
            currency: "USD"
        }
    },
    {
        presetId: 1,
        title: "1TB",
        form: {
            price: 1499,
            currency: "USD"
        }
    },


    // [2] Apple iPhone 14 Pro Max
    {
        presetId: 2,
        title: "128GB",
        form: {
            price: 1099,
            currency: "USD"
        }
    },
    {
        presetId: 2,
        title: "256GB",
        form: {
            price: 1199,
            currency: "USD"
        }
    },
    {
        presetId: 2,
        title: "512GB",
        form: {
            price: 1399,
            currency: "USD"
        }
    },
    {
        presetId: 2,
        title: "1TB",
        form: {
            price: 1599,
            currency: "USD"
        }
    },


    // [3] Apple iPhone 14
    {
        presetId: 3,
        title: "128GB",
        form: {
            price: 599,
            currency: "USD"
        }
    },
    {
        presetId: 3,
        title: "256GB",
        form: {
            price: 699,
            currency: "USD"
        }
    },
    {
        presetId: 3,
        title: "512GB",
        form: {
            price: 899,
            currency: "USD"
        }
    },


    // [4] Apple iPhone 14 Plus
    {
        presetId: 4,
        title: "128GB",
        form: {
            price: 699,
            currency: "USD"
        }
    },
    {
        presetId: 4,
        title: "256GB",
        form: {
            price: 799,
            currency: "USD"
        }
    },
    {
        presetId: 4,
        title: "512GB",
        form: {
            price: 999,
            currency: "USD"
        }
    },


    // [5] Apple iPhone 13 mini
    {
        presetId: 5,
        title: "128GB",
        form: {
            price: 599,
            currency: "USD"
        }
    },
    {
        presetId: 5,
        title: "256GB",
        form: {
            price: 699,
            currency: "USD"
        }
    },
    {
        presetId: 5,
        title: "512GB",
        form: {
            price: 899,
            currency: "USD"
        }
    },


    // [6] Apple iPhone 13
    {
        presetId: 6,
        title: "128GB",
        form: {
            price: 699,
            currency: "USD"
        }
    },
    {
        presetId: 6,
        title: "256GB",
        form: {
            price: 799,
            currency: "USD"
        }
    },
    {
        presetId: 6,
        title: "512GB",
        form: {
            price: 999,
            currency: "USD"
        }
    },


    // [7] Apple iPhone SE 3 (2022)
    {
        presetId: 7,
        title: "64GB",
        form: {
            price: 429,
            currency: "USD"
        }
    },
    {
        presetId: 7,
        title: "128GB",
        form: {
            price: 479,
            currency: "USD"
        }
    },
    {
        presetId: 7,
        title: "256GB",
        form: {
            price: 579,
            currency: "USD"
        }
    },


    // [8] Apple iPhone 12
    {
        presetId: 8,
        title: "64GB",
        form: {
            price: 599,
            currency: "USD"
        }
    },
    {
        presetId: 8,
        title: "128GB",
        form: {
            price: 649,
            currency: "USD"
        }
    },
    {
        presetId: 8,
        title: "256GB",
        form: {
            price: 749,
            currency: "USD"
        }
    },


    // [9] Apple Vision Pro
    {
        presetId: 9,
        title: "Standart",
        form: {
            price: 3499,
            currency: "USD"
        }
    },


    // [10] Samsung Galaxy S23
    {
        presetId: 10,
        title: "128GB",
        form: {
            price: 799.99,
            currency: "USD"
        }
    },
    {
        presetId: 10,
        title: "256GB",
        form: {
            price: 859.99,
            currency: "USD"
        }
    },


    // [11] Samsung Galaxy S23+
    {
        presetId: 11,
        title: "256GB",
        form: {
            price: 999.99,
            currency: "USD"
        }
    },
    {
        presetId: 11,
        title: "512GB",
        form: {
            price: 1119.99,
            currency: "USD"
        }
    },


    // [21] Samsung Galaxy S23 FE
    {
        presetId: 21,
        title: "128GB",
        form: {
            price: 629.99,
            currency: "USD"
        }
    },
    {
        presetId: 21,
        title: "256GB",
        form: {
            price: 689.99,
            currency: "USD"
        }
    },


    // [12] Samsung Galaxy S23 Ultra
    {
        presetId: 12,
        title: "256GB (8GB)",
        form: {
            price: 1199.99,
            currency: "USD"
        }
    },
    {
        presetId: 12,
        title: "512GB (8GB)",
        form: {
            price: 1379.99,
            currency: "USD"
        }
    },
    {
        presetId: 12,
        title: "1TB (12GB)",
        form: {
            price: 1619.99,
            currency: "USD"
        }
    },


    // [15] Samsung Galaxy Z Fold5
    {
        presetId: 15,
        title: "256GB",
        form: {
            price: 1799.99,
            currency: "USD"
        }
    },
    {
        presetId: 15,
        title: "512GB",
        form: {
            price: 1919.99,
            currency: "USD"
        }
    },
    {
        presetId: 15,
        title: "1TB",
        form: {
            price: 2159.99,
            currency: "USD"
        }
    },


    // [13] Samsung Galaxy Z Fold4
    {
        presetId: 13,
        title: "256GB",
        form: {
            price: 1599.99,
            currency: "USD"
        }
    },
    {
        presetId: 13,
        title: "512GB",
        form: {
            price: 1719.99,
            currency: "USD"
        }
    },
    {
        presetId: 13,
        title: "1TB",
        form: {
            price: 1959.99,
            currency: "USD"
        }
    },


    // [16] Samsung Galaxy Z Flip5
    {
        presetId: 16,
        title: "256GB",
        form: {
            price: 999.99,
            currency: "USD"
        }
    },
    {
        presetId: 16,
        title: "512GB",
        form: {
            price: 1199.99,
            currency: "USD"
        }
    },


    // [14] Samsung Galaxy Z Flip4
    {
        presetId: 14,
        title: "128GB",
        form: {
            price: 899.99,
            currency: "USD"
        }
    },
    {
        presetId: 14,
        title: "256GB",
        form: {
            price: 1059.99,
            currency: "USD"
        }
    },
    {
        presetId: 14,
        title: "512GB",
        form: {
            price: 1179.99,
            currency: "USD"
        }
    }
];

export default presetOptions;
