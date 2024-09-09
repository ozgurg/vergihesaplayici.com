const lastUpdatedDateIphone = new Date("Mon Sep 09 2024 21:38:04 GMT+0300 (GMT+03:00)");
const lastUpdatedDateSamsung = new Date("Tue Mar 05 2024 20:13:15 GMT+0300 (GMT+03:00)");

/** @type {TelefonVergisiHesaplayiciPresetOption[]} */
const presetOptions = [
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
        },
        retailPrice: {
            value: 75499,
            lastUpdatedDate: lastUpdatedDateIphone,
            sourceUrl: "https://www.apple.com/tr/shop/buy-iphone/iphone-15-pro"
        }
    },
    {
        presetId: 17,
        title: "256GB",
        form: {
            price: 1099,
            currency: "USD"
        },
        retailPrice: {
            value: 79999,
            lastUpdatedDate: lastUpdatedDateIphone,
            sourceUrl: "https://www.apple.com/tr/shop/buy-iphone/iphone-15-pro"
        }
    },
    {
        presetId: 17,
        title: "512GB",
        form: {
            price: 1299,
            currency: "USD"
        },
        retailPrice: {
            value: 88999,
            lastUpdatedDate: lastUpdatedDateIphone,
            sourceUrl: "https://www.apple.com/tr/shop/buy-iphone/iphone-15-pro"
        }
    },
    {
        presetId: 17,
        title: "1TB",
        form: {
            price: 1499,
            currency: "USD"
        },
        retailPrice: {
            value: 97999,
            lastUpdatedDate: lastUpdatedDateIphone,
            sourceUrl: "https://www.apple.com/tr/shop/buy-iphone/iphone-15-pro"
        }
    },

    // [18] Apple iPhone 15 Pro Max
    {
        presetId: 18,
        title: "256GB",
        form: {
            price: 1199,
            currency: "USD"
        },
        retailPrice: {
            value: 89999,
            lastUpdatedDate: lastUpdatedDateIphone,
            sourceUrl: "https://www.apple.com/tr/shop/buy-iphone/iphone-15-pro"
        }
    },
    {
        presetId: 18,
        title: "512GB",
        form: {
            price: 1399,
            currency: "USD"
        },
        retailPrice: {
            value: 98999,
            lastUpdatedDate: lastUpdatedDateIphone,
            sourceUrl: "https://www.apple.com/tr/shop/buy-iphone/iphone-15-pro"
        }
    },
    {
        presetId: 18,
        title: "1TB",
        form: {
            price: 1599,
            currency: "USD"
        },
        retailPrice: {
            value: 107999,
            lastUpdatedDate: lastUpdatedDateIphone,
            sourceUrl: "https://www.apple.com/tr/shop/buy-iphone/iphone-15-pro"
        }
    },

    // [19] Apple iPhone 15
    {
        presetId: 19,
        title: "128GB",
        form: {
            price: 799,
            currency: "USD"
        },
        retailPrice: {
            value: 58499,
            lastUpdatedDate: lastUpdatedDateIphone,
            sourceUrl: "https://www.apple.com/tr/shop/buy-iphone/iphone-15"
        }
    },
    {
        presetId: 19,
        title: "256GB",
        form: {
            price: 899,
            currency: "USD"
        },
        retailPrice: {
            value: 62999,
            lastUpdatedDate: lastUpdatedDateIphone,
            sourceUrl: "https://www.apple.com/tr/shop/buy-iphone/iphone-15"
        }
    },
    {
        presetId: 19,
        title: "512GB",
        form: {
            price: 1099,
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
            price: 899,
            currency: "USD"
        },
        retailPrice: {
            value: 66999,
            lastUpdatedDate: lastUpdatedDateIphone,
            sourceUrl: "https://www.apple.com/tr/shop/buy-iphone/iphone-15"
        }
    },
    {
        presetId: 20,
        title: "256GB",
        form: {
            price: 999,
            currency: "USD"
        },
        retailPrice: {
            value: 71499,
            lastUpdatedDate: lastUpdatedDateIphone,
            sourceUrl: "https://www.apple.com/tr/shop/buy-iphone/iphone-15"
        }
    },
    {
        presetId: 20,
        title: "512GB",
        form: {
            price: 1199,
            currency: "USD"
        },
        retailPrice: {
            value: 80499,
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
            price: 799,
            currency: "USD"
        },
        retailPrice: {
            value: 51499,
            lastUpdatedDate: lastUpdatedDateIphone,
            sourceUrl: "https://www.apple.com/tr/shop/buy-iphone/iphone-14"
        }
    },
    {
        presetId: 3,
        title: "256GB",
        form: {
            price: 899,
            currency: "USD"
        },
        retailPrice: {
            value: 55999,
            lastUpdatedDate: lastUpdatedDateIphone,
            sourceUrl: "https://www.apple.com/tr/shop/buy-iphone/iphone-14"
        }
    },
    {
        presetId: 3,
        title: "512GB",
        form: {
            price: 1099,
            currency: "USD"
        },
        retailPrice: {
            value: 64999,
            lastUpdatedDate: lastUpdatedDateIphone,
            sourceUrl: "https://www.apple.com/tr/shop/buy-iphone/iphone-14"
        }
    },

    // [4] Apple iPhone 14 Plus
    {
        presetId: 4,
        title: "128GB",
        form: {
            price: 899,
            currency: "USD"
        },
        retailPrice: {
            value: 58499,
            lastUpdatedDate: lastUpdatedDateIphone,
            sourceUrl: "https://www.apple.com/tr/shop/buy-iphone/iphone-14"
        }
    },
    {
        presetId: 4,
        title: "256GB",
        form: {
            price: 999,
            currency: "USD"
        },
        retailPrice: {
            value: 62999,
            lastUpdatedDate: lastUpdatedDateIphone,
            sourceUrl: "https://www.apple.com/tr/shop/buy-iphone/iphone-14"
        }
    },
    {
        presetId: 4,
        title: "512GB",
        form: {
            price: 1199,
            currency: "USD"
        },
        retailPrice: {
            value: 71999,
            lastUpdatedDate: lastUpdatedDateIphone,
            sourceUrl: "https://www.apple.com/tr/shop/buy-iphone/iphone-14"
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
        },
        retailPrice: {
            value: 42999,
            lastUpdatedDate: lastUpdatedDateIphone,
            sourceUrl: "https://www.apple.com/tr/shop/buy-iphone/iphone-13"
        }
    },
    {
        presetId: 6,
        title: "256GB",
        form: {
            price: 799,
            currency: "USD"
        },
        retailPrice: {
            value: 47499,
            lastUpdatedDate: lastUpdatedDateIphone,
            sourceUrl: "https://www.apple.com/tr/shop/buy-iphone/iphone-13"
        }
    },
    {
        presetId: 6,
        title: "512GB",
        form: {
            price: 999,
            currency: "USD"
        },
        retailPrice: {
            value: 56499,
            lastUpdatedDate: lastUpdatedDateIphone,
            sourceUrl: "https://www.apple.com/tr/shop/buy-iphone/iphone-13"
        }
    },


    // [7] Apple iPhone SE 3 (2022)
    {
        presetId: 7,
        title: "64GB",
        form: {
            price: 429,
            currency: "USD"
        },
        retailPrice: {
            value: 28999,
            lastUpdatedDate: lastUpdatedDateIphone,
            sourceUrl: "https://www.apple.com/tr/shop/buy-iphone/iphone-se"
        }
    },
    {
        presetId: 7,
        title: "128GB",
        form: {
            price: 479,
            currency: "USD"
        },
        retailPrice: {
            value: 31199,
            lastUpdatedDate: lastUpdatedDateIphone,
            sourceUrl: "https://www.apple.com/tr/shop/buy-iphone/iphone-se"
        }
    },
    {
        presetId: 7,
        title: "256GB",
        form: {
            price: 579,
            currency: "USD"
        },
        retailPrice: {
            value: 35699,
            lastUpdatedDate: lastUpdatedDateIphone,
            sourceUrl: "https://www.apple.com/tr/shop/buy-iphone/iphone-se"
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
        },
        retailPrice: {
            value: 37999,
            lastUpdatedDate: lastUpdatedDateSamsung,
            sourceUrl: "https://shop.samsung.com/tr/galaxy-s23/"
        }
    },
    {
        presetId: 10,
        title: "256GB",
        form: {
            price: 859.99,
            currency: "USD"
        },
        retailPrice: {
            value: 39999,
            lastUpdatedDate: lastUpdatedDateSamsung,
            sourceUrl: "https://shop.samsung.com/tr/galaxy-s23/"
        }
    },

    // [11] Samsung Galaxy S23+
    {
        presetId: 11,
        title: "256GB",
        form: {
            price: 999.99,
            currency: "USD"
        },
        retailPrice: {
            value: 48499,
            lastUpdatedDate: lastUpdatedDateSamsung,
            sourceUrl: "https://shop.samsung.com/tr/galaxy-s23-plus/"
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
        },
        retailPrice: {
            value: 24999,
            lastUpdatedDate: lastUpdatedDateSamsung,
            sourceUrl: "https://shop.samsung.com/tr/galaxy-s23-fe/"
        }
    },
    {
        presetId: 21,
        title: "256GB",
        form: {
            price: 689.99,
            currency: "USD"
        },
        retailPrice: {
            value: 26999,
            lastUpdatedDate: lastUpdatedDateSamsung,
            sourceUrl: "https://shop.samsung.com/tr/galaxy-s23-fe/"
        }
    },

    // [12] Samsung Galaxy S23 Ultra
    {
        presetId: 12,
        title: "256GB (8GB)",
        form: {
            price: 1199.99,
            currency: "USD"
        },
        retailPrice: {
            value: 61999,
            lastUpdatedDate: lastUpdatedDateSamsung,
            sourceUrl: "https://shop.samsung.com/tr/galaxy-s23-ultra/"
        }
    },
    {
        presetId: 12,
        title: "512GB (8GB)",
        form: {
            price: 1379.99,
            currency: "USD"
        },
        retailPrice: {
            value: 65999,
            lastUpdatedDate: lastUpdatedDateSamsung,
            sourceUrl: "https://shop.samsung.com/tr/galaxy-s23-ultra/"
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
        },
        retailPrice: {
            value: 73999,
            lastUpdatedDate: lastUpdatedDateSamsung,
            sourceUrl: "https://shop.samsung.com/tr/galaxy-z-fold5/"
        }
    },
    {
        presetId: 15,
        title: "512GB",
        form: {
            price: 1919.99,
            currency: "USD"
        },
        retailPrice: {
            value: 75999,
            lastUpdatedDate: lastUpdatedDateSamsung,
            sourceUrl: "https://shop.samsung.com/tr/galaxy-z-fold5/"
        }
    },
    {
        presetId: 15,
        title: "1TB",
        form: {
            price: 2159.99,
            currency: "USD"
        },
        retailPrice: {
            value: 82999,
            lastUpdatedDate: lastUpdatedDateSamsung,
            sourceUrl: "https://shop.samsung.com/tr/galaxy-z-fold5/"
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
        },
        retailPrice: {
            value: 47999,
            lastUpdatedDate: lastUpdatedDateSamsung,
            sourceUrl: "https://shop.samsung.com/tr/galaxy-z-flip5/"
        }
    },
    {
        presetId: 16,
        title: "512GB",
        form: {
            price: 1199.99,
            currency: "USD"
        },
        retailPrice: {
            value: 51999,
            lastUpdatedDate: lastUpdatedDateSamsung,
            sourceUrl: "https://shop.samsung.com/tr/galaxy-z-flip5/"
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
