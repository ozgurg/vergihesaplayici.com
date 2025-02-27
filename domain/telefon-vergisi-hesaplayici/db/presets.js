/**
 * @param {string} phoneNameWithPossession
 * @return {{pageTitle: string, pageDescription: string}}
 */
const buildPageMeta = phoneNameWithPossession => ({
    pageTitle: `${phoneNameWithPossession} vergisi ne kadar?`,
    pageDescription: `${phoneNameWithPossession} vergisini hesaplamak için başta ÖTV gibi tüm telefon vergilerini hesaplama yeteneğine sahip Telefon Vergisi Hesaplayıcı aracını kullanın. Vergilerin ne kadar uygulandığını ve vergisiz telefon fiyatını öğrenin. Yurt içi ve yurt dışı fiyatlarını karşılaştırın.`
});

// Last ID: 26

/** @type {TelefonVergisiHesaplayiciPreset[]} */
const presets = [
    {
        id: 26,
        brandId: 1,
        title: "iPhone 16e",
        slug: "apple-iphone-16e",
        releaseDate: new Date("2025-02-19"),
        thumbnail: "telefon-vergisi-hesaplayici/thumb/apple-iphone-16e.webp",
        ogImage: "telefon-vergisi-hesaplayici/og/apple-iphone-16e.jpg",
        ...buildPageMeta("Apple iPhone 16e'nin")
    },
    {
        id: 22,
        brandId: 1,
        title: "iPhone 16 Pro",
        slug: "apple-iphone-16-pro",
        releaseDate: new Date("2024-09-09"),
        thumbnail: "telefon-vergisi-hesaplayici/thumb/apple-iphone-16-pro.webp",
        ogImage: "telefon-vergisi-hesaplayici/og/apple-iphone-16-pro.jpg",
        ...buildPageMeta("Apple iPhone 16 Pro'nun")
    },
    {
        id: 23,
        brandId: 1,
        title: "iPhone 16 Pro Max",
        slug: "apple-iphone-16-pro-max",
        releaseDate: new Date("2024-09-09"),
        thumbnail: "telefon-vergisi-hesaplayici/thumb/apple-iphone-16-pro-max.webp",
        ogImage: "telefon-vergisi-hesaplayici/og/apple-iphone-16-pro-max.jpg",
        ...buildPageMeta("Apple iPhone 16 Pro Max'in")
    },
    {
        id: 24,
        brandId: 1,
        title: "iPhone 16",
        slug: "apple-iphone-16",
        releaseDate: new Date("2024-09-09"),
        thumbnail: "telefon-vergisi-hesaplayici/thumb/apple-iphone-16.webp",
        ogImage: "telefon-vergisi-hesaplayici/og/apple-iphone-16.jpg",
        ...buildPageMeta("Apple iPhone 16'in")
    },
    {
        id: 25,
        brandId: 1,
        title: "iPhone 16 Plus",
        slug: "apple-iphone-16-plus",
        releaseDate: new Date("2024-09-09"),
        thumbnail: "telefon-vergisi-hesaplayici/thumb/apple-iphone-16-plus.webp",
        ogImage: "telefon-vergisi-hesaplayici/og/apple-iphone-16-plus.jpg",
        ...buildPageMeta("Apple iPhone 16 Plus'ın")
    },


    {
        id: 17,
        brandId: 1,
        title: "iPhone 15 Pro",
        slug: "iphone-15-pro", // TODO: "apple-" prefix will be added
        releaseDate: new Date("2023-09-12"),
        thumbnail: "telefon-vergisi-hesaplayici/thumb/apple-iphone-15-pro.webp",
        ogImage: "telefon-vergisi-hesaplayici/og/apple-iphone-15-pro.jpg",
        ...buildPageMeta("Apple iPhone 15 Pro'nun")
    },
    {
        id: 18,
        brandId: 1,
        title: "iPhone 15 Pro Max",
        slug: "iphone-15-pro-max", // TODO: "apple-" prefix will be added
        releaseDate: new Date("2023-09-12"),
        thumbnail: "telefon-vergisi-hesaplayici/thumb/apple-iphone-15-pro-max.webp",
        ogImage: "telefon-vergisi-hesaplayici/og/apple-iphone-15-pro-max.jpg",
        ...buildPageMeta("Apple iPhone 15 Pro Max'in")
    },
    {
        id: 19,
        brandId: 1,
        title: "iPhone 15",
        slug: "iphone-15", // TODO: "apple-" prefix will be added
        releaseDate: new Date("2023-09-12"),
        thumbnail: "telefon-vergisi-hesaplayici/thumb/apple-iphone-15.webp",
        ogImage: "telefon-vergisi-hesaplayici/og/apple-iphone-15.jpg",
        ...buildPageMeta("Apple iPhone 15'in")
    },
    {
        id: 20,
        brandId: 1,
        title: "iPhone 15 Plus",
        slug: "iphone-15-plus", // TODO: "apple-" prefix will be added
        releaseDate: new Date("2023-09-12"),
        thumbnail: "telefon-vergisi-hesaplayici/thumb/apple-iphone-15-plus.webp",
        ogImage: "telefon-vergisi-hesaplayici/og/apple-iphone-15-plus.jpg",
        ...buildPageMeta("Apple iPhone 15 Plus'ın")
    },

    {
        id: 1,
        brandId: 1,
        title: "iPhone 14 Pro",
        slug: "iphone-14-pro", // TODO: "apple-" prefix will be added
        releaseDate: new Date("2022-09-16"),
        thumbnail: "telefon-vergisi-hesaplayici/thumb/apple-iphone-14-pro.webp",
        ogImage: "telefon-vergisi-hesaplayici/og/apple-iphone-14-pro.jpg",
        ...buildPageMeta("Apple iPhone 14 Pro'nun")
    },
    {
        id: 2,
        brandId: 1,
        title: "iPhone 14 Pro Max",
        slug: "iphone-14-pro-max", // TODO: "apple-" prefix will be added
        releaseDate: new Date("2022-09-16"),
        thumbnail: "telefon-vergisi-hesaplayici/thumb/apple-iphone-14-pro-max.webp",
        ogImage: "telefon-vergisi-hesaplayici/og/apple-iphone-14-pro-max.jpg",
        ...buildPageMeta("Apple iPhone 14 Pro Max'in")
    },
    {
        id: 3,
        brandId: 1,
        title: "iPhone 14",
        slug: "iphone-14", // TODO: "apple-" prefix will be added
        releaseDate: new Date("2022-09-16"),
        thumbnail: "telefon-vergisi-hesaplayici/thumb/apple-iphone-14.webp",
        ogImage: "telefon-vergisi-hesaplayici/og/apple-iphone-14.jpg",
        ...buildPageMeta("Apple iPhone 14'ün")
    },
    {
        id: 4,
        brandId: 1,
        title: "iPhone 14 Plus",
        slug: "iphone-14-plus", // TODO: "apple-" prefix will be added
        releaseDate: new Date("2022-09-16"),
        thumbnail: "telefon-vergisi-hesaplayici/thumb/apple-iphone-14-plus.webp",
        ogImage: "telefon-vergisi-hesaplayici/og/apple-iphone-14-plus.jpg",
        ...buildPageMeta("Apple iPhone 14 Plus'ın")
    },

    {
        id: 5,
        brandId: 1,
        title: "iPhone 13 mini",
        slug: "iphone-13-mini", // TODO: "apple-" prefix will be added
        releaseDate: new Date("2021-09-24"),
        thumbnail: "telefon-vergisi-hesaplayici/thumb/apple-iphone-13-mini.webp",
        ogImage: "telefon-vergisi-hesaplayici/og/apple-iphone-13-mini.jpg",
        ...buildPageMeta("Apple iPhone 13 mini'nin")
    },
    {
        id: 6,
        brandId: 1,
        title: "iPhone 13",
        slug: "iphone-13", // TODO: "apple-" prefix will be added
        releaseDate: new Date("2021-09-24"),
        thumbnail: "telefon-vergisi-hesaplayici/thumb/apple-iphone-13.webp",
        ogImage: "telefon-vergisi-hesaplayici/og/apple-iphone-13.jpg",
        ...buildPageMeta("Apple iPhone 13'ün")
    },

    {
        id: 7,
        brandId: 1,
        title: "iPhone SE 3",
        slug: "iphone-se-3-2022", // TODO: "apple-" prefix will be added
        releaseDate: new Date("2022-03-08"),
        thumbnail: "telefon-vergisi-hesaplayici/thumb/apple-iphone-se-3-2022.webp",
        ogImage: "telefon-vergisi-hesaplayici/og/apple-iphone-se-2022.jpg",
        ...buildPageMeta("Apple iPhone SE 3'ün (2022)")
    },

    {
        id: 8,
        brandId: 1,
        title: "iPhone 12",
        slug: "iphone-12", // TODO: "apple-" prefix will be added
        releaseDate: new Date("2020-10-23"),
        thumbnail: "telefon-vergisi-hesaplayici/thumb/apple-iphone-12.webp",
        ogImage: "telefon-vergisi-hesaplayici/og/apple-iphone-12.jpg",
        ...buildPageMeta("Apple iPhone 12'nin")
    },

    {
        id: 9,
        brandId: 1,
        title: "Vision Pro",
        slug: "apple-vision-pro",
        releaseDate: new Date("2024-02-02"),
        thumbnail: "telefon-vergisi-hesaplayici/thumb/apple-vision-pro.webp",
        ogImage: "telefon-vergisi-hesaplayici/og/apple-vision-pro.jpg",
        ...buildPageMeta("Apple Vision Pro'nun")
    },

    {
        id: 10,
        brandId: 2,
        title: "Galaxy S23",
        slug: "samsung-galaxy-s23",
        releaseDate: new Date("2023-02-01"),
        thumbnail: "telefon-vergisi-hesaplayici/thumb/samsung-galaxy-s23.webp",
        ogImage: "telefon-vergisi-hesaplayici/og/samsung-galaxy-s23.jpg",
        ...buildPageMeta("Samsung Galaxy S23'ün")
    },
    {
        id: 11,
        brandId: 2,
        title: "Galaxy S23+",
        slug: "samsung-galaxy-s23-plus",
        releaseDate: new Date("2023-02-01"),
        thumbnail: "telefon-vergisi-hesaplayici/thumb/samsung-galaxy-s23-plus.webp",
        ogImage: "telefon-vergisi-hesaplayici/og/samsung-galaxy-s23-plus.jpg",
        ...buildPageMeta("Samsung Galaxy S23+'ın")
    },
    {
        id: 21,
        brandId: 2,
        title: "Galaxy S23 FE",
        slug: "samsung-galaxy-s23-fe",
        releaseDate: new Date("2023-10-26"),
        thumbnail: "telefon-vergisi-hesaplayici/thumb/samsung-galaxy-s23-fe.webp",
        ogImage: "telefon-vergisi-hesaplayici/og/samsung-galaxy-s23-fe.jpg",
        ...buildPageMeta("Samsung Galaxy S23 FE'nin")
    },
    {
        id: 12,
        brandId: 2,
        title: "Galaxy S23 Ultra",
        slug: "samsung-galaxy-s23-ultra",
        releaseDate: new Date("2023-02-01"),
        thumbnail: "telefon-vergisi-hesaplayici/thumb/samsung-galaxy-s23-ultra.webp",
        ogImage: "telefon-vergisi-hesaplayici/og/samsung-galaxy-s23-ultra.jpg",
        ...buildPageMeta("Samsung Galaxy S23 Ultra'nın")
    },

    {
        id: 15,
        brandId: 2,
        title: "Galaxy Z Fold5",
        slug: "samsung-galaxy-z-fold5",
        releaseDate: new Date("2023-07-26"),
        thumbnail: "telefon-vergisi-hesaplayici/thumb/samsung-galaxy-z-fold5.webp",
        ogImage: "telefon-vergisi-hesaplayici/og/samsung-galaxy-z-fold5.jpg",
        ...buildPageMeta("Samsung Galaxy Z Fold5'in")
    },
    {
        id: 13,
        brandId: 2,
        title: "Galaxy Z Fold4",
        slug: "samsung-galaxy-z-fold4",
        releaseDate: new Date("2022-08-25"),
        thumbnail: "telefon-vergisi-hesaplayici/thumb/samsung-galaxy-z-fold4.webp",
        ogImage: "telefon-vergisi-hesaplayici/og/samsung-galaxy-z-fold4.jpg",
        ...buildPageMeta("Samsung Galaxy Z Fold4'ün")
    },

    {
        id: 16,
        brandId: 2,
        title: "Galaxy Z Flip5",
        slug: "samsung-galaxy-z-flip5",
        releaseDate: new Date("2023-07-26"),
        thumbnail: "telefon-vergisi-hesaplayici/thumb/samsung-galaxy-z-flip5.webp",
        ogImage: "telefon-vergisi-hesaplayici/og/samsung-galaxy-z-flip5.jpg",
        ...buildPageMeta("Samsung Galaxy Z Flip5'in")
    },
    {
        id: 14,
        brandId: 2,
        title: "Galaxy Z Flip4",
        slug: "samsung-galaxy-z-flip4",
        releaseDate: new Date("2022-08-26"),
        thumbnail: "telefon-vergisi-hesaplayici/thumb/samsung-galaxy-z-flip4.webp",
        ogImage: "telefon-vergisi-hesaplayici/og/samsung-galaxy-z-flip4.jpg",
        ...buildPageMeta("Samsung Galaxy Z Flip4'ün")
    }
];

export default presets;
