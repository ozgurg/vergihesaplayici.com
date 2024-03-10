const buildUrl = slug => `/telefon-vergisi-hesaplayici/${slug}/`;

const buildPageMeta = phoneNameWithPossession => ({
    pageTitle: `${phoneNameWithPossession} vergisi ne kadar?`,
    pageDescription: `${phoneNameWithPossession} vergisini hesaplamak için başta ÖTV gibi tüm telefon vergilerini hesaplama yeteneğine sahip Telefon Vergisi Hesaplayıcı aracını kullanın. Vergilerin ne kadar uygulandığını ve vergisiz telefon fiyatını öğrenin. Yurt içi ve yurt dışı fiyatlarını karşılaştırın.`
});

export default [
    {
        id: 17,
        brandId: 1,
        title: "iPhone 15 Pro",
        slug: "iphone-15-pro", // TODO: "apple-" prefix will be added
        releaseDate: new Date("2023-09-12"),
        thumbnail: "telefon-vergisi-hesaplayici/thumb/apple-iphone-15-pro.webp",
        url: buildUrl("iphone-15-pro"), // TODO: "apple-" prefix will be added
        ogImageName: "telefon-vergisi-hesaplayici-apple-iphone-15-pro.jpg",
        ...buildPageMeta("Apple iPhone 15 Pro'nun")
    },
    {
        id: 18,
        brandId: 1,
        title: "iPhone 15 Pro Max",
        slug: "iphone-15-pro-max", // TODO: "apple-" prefix will be added
        releaseDate: new Date("2023-09-12"),
        thumbnail: "telefon-vergisi-hesaplayici/thumb/apple-iphone-15-pro-max.webp",
        url: buildUrl("iphone-15-pro-max"), // TODO: "apple-" prefix will be added
        ogImageName: "telefon-vergisi-hesaplayici-apple-iphone-15-pro-max.jpg",
        ...buildPageMeta("Apple iPhone 15 Pro Max'in")
    },
    {
        id: 19,
        brandId: 1,
        title: "iPhone 15",
        slug: "iphone-15", // TODO: "apple-" prefix will be added
        releaseDate: new Date("2023-09-12"),
        thumbnail: "telefon-vergisi-hesaplayici/thumb/apple-iphone-15.webp",
        url: buildUrl("iphone-15"), // TODO: "apple-" prefix will be added
        ogImageName: "telefon-vergisi-hesaplayici-apple-iphone-15.jpg",
        ...buildPageMeta("Apple iPhone 15'in")
    },
    {
        id: 20,
        brandId: 1,
        title: "iPhone 15 Plus",
        slug: "iphone-15-plus", // TODO: "apple-" prefix will be added
        releaseDate: new Date("2023-09-12"),
        thumbnail: "telefon-vergisi-hesaplayici/thumb/apple-iphone-15-plus.webp",
        url: buildUrl("iphone-15-plus"), // TODO: "apple-" prefix will be added
        ogImageName: "telefon-vergisi-hesaplayici-apple-iphone-15-plus.jpg",
        ...buildPageMeta("Apple iPhone 15 Plus'ın")
    },

    {
        id: 1,
        brandId: 1,
        title: "iPhone 14 Pro",
        slug: "iphone-14-pro", // TODO: "apple-" prefix will be added
        releaseDate: new Date("2022-09-16"),
        thumbnail: "telefon-vergisi-hesaplayici/thumb/apple-iphone-14-pro.webp",
        url: buildUrl("iphone-14-pro"), // TODO: "apple-" prefix will be added
        ogImageName: "telefon-vergisi-hesaplayici-apple-iphone-14-pro.jpg",
        ...buildPageMeta("Apple iPhone 14 Pro'nun")
    },
    {
        id: 2,
        brandId: 1,
        title: "iPhone 14 Pro Max",
        slug: "iphone-14-pro-max", // TODO: "apple-" prefix will be added
        releaseDate: new Date("2022-09-16"),
        thumbnail: "telefon-vergisi-hesaplayici/thumb/apple-iphone-14-pro-max.webp",
        url: buildUrl("iphone-14-pro-max"), // TODO: "apple-" prefix will be added
        ogImageName: "telefon-vergisi-hesaplayici-apple-iphone-14-pro-max.jpg",
        ...buildPageMeta("Apple iPhone 14 Pro Max'in")
    },
    {
        id: 3,
        brandId: 1,
        title: "iPhone 14",
        slug: "iphone-14", // TODO: "apple-" prefix will be added
        releaseDate: new Date("2022-09-16"),
        thumbnail: "telefon-vergisi-hesaplayici/thumb/apple-iphone-14.webp",
        url: buildUrl("iphone-14"), // TODO: "apple-" prefix will be added
        ogImageName: "telefon-vergisi-hesaplayici-apple-iphone-14.jpg",
        ...buildPageMeta("Apple iPhone 14'ün")
    },
    {
        id: 4,
        brandId: 1,
        title: "iPhone 14 Plus",
        slug: "iphone-14-plus", // TODO: "apple-" prefix will be added
        releaseDate: new Date("2022-09-16"),
        thumbnail: "telefon-vergisi-hesaplayici/thumb/apple-iphone-14-plus.webp",
        url: buildUrl("iphone-14-plus"), // TODO: "apple-" prefix will be added
        ogImageName: "telefon-vergisi-hesaplayici-apple-iphone-14-plus.jpg",
        ...buildPageMeta("Apple iPhone 14 Plus'ın")
    },

    {
        id: 5,
        brandId: 1,
        title: "iPhone 13 mini",
        slug: "iphone-13-mini", // TODO: "apple-" prefix will be added
        releaseDate: new Date("2021-09-24"),
        thumbnail: "telefon-vergisi-hesaplayici/thumb/apple-iphone-13-mini.webp",
        url: buildUrl("iphone-13-mini"), // TODO: "apple-" prefix will be added
        ogImageName: "telefon-vergisi-hesaplayici-apple-iphone-13-mini.jpg",
        ...buildPageMeta("Apple iPhone 13 mini'nin")
    },
    {
        id: 6,
        brandId: 1,
        title: "iPhone 13",
        slug: "iphone-13", // TODO: "apple-" prefix will be added
        releaseDate: new Date("2021-09-24"),
        thumbnail: "telefon-vergisi-hesaplayici/thumb/apple-iphone-13.webp",
        url: buildUrl("iphone-13"), // TODO: "apple-" prefix will be added
        ogImageName: "telefon-vergisi-hesaplayici-apple-iphone-13.jpg",
        ...buildPageMeta("Apple iPhone 13'ün")
    },

    {
        id: 7,
        brandId: 1,
        title: "iPhone SE 3",
        slug: "iphone-se-3-2022", // TODO: "apple-" prefix will be added
        releaseDate: new Date("2022-03-08"),
        thumbnail: "telefon-vergisi-hesaplayici/thumb/apple-iphone-se-3-2022.webp",
        url: buildUrl("iphone-se-3-2022"), // TODO: "apple-" prefix will be added
        ogImageName: "telefon-vergisi-hesaplayici-apple-iphone-se-2022.jpg",
        ...buildPageMeta("Apple iPhone SE 3'ün (2022)")
    },

    {
        id: 8,
        brandId: 1,
        title: "iPhone 12",
        slug: "iphone-12", // TODO: "apple-" prefix will be added
        releaseDate: new Date("2020-10-23"),
        thumbnail: "telefon-vergisi-hesaplayici/thumb/apple-iphone-12.webp",
        url: buildUrl("iphone-12"), // TODO: "apple-" prefix will be added
        ogImageName: "telefon-vergisi-hesaplayici-apple-iphone-12.jpg",
        ...buildPageMeta("Apple iPhone 12'nin")
    },

    {
        id: 9,
        brandId: 1,
        title: "Vision Pro",
        slug: "apple-vision-pro",
        releaseDate: new Date("2024-12-31"),
        thumbnail: "telefon-vergisi-hesaplayici/thumb/apple-vision-pro.webp",
        url: buildUrl("apple-vision-pro"),
        ogImageName: "telefon-vergisi-hesaplayici-apple-vision-pro.jpg",
        ...buildPageMeta("Apple Vision Pro'nun")
    },

    {
        id: 10,
        brandId: 2,
        title: "Galaxy S23",
        slug: "samsung-galaxy-s23",
        releaseDate: new Date("2023-02-01"),
        thumbnail: "telefon-vergisi-hesaplayici/thumb/samsung-galaxy-s23.webp",
        url: buildUrl("samsung-galaxy-s23"),
        ogImageName: "telefon-vergisi-hesaplayici-samsung-galaxy-s23.jpg",
        ...buildPageMeta("Samsung Galaxy S23'ün")
    },
    {
        id: 11,
        brandId: 2,
        title: "Galaxy S23+",
        slug: "samsung-galaxy-s23-plus",
        releaseDate: new Date("2023-02-01"),
        thumbnail: "telefon-vergisi-hesaplayici/thumb/samsung-galaxy-s23-plus.webp",
        url: buildUrl("samsung-galaxy-s23-plus"),
        ogImageName: "telefon-vergisi-hesaplayici-samsung-galaxy-s23-plus.jpg",
        ...buildPageMeta("Samsung Galaxy S23+'ın")
    },
    {
        id: 21,
        brandId: 2,
        title: "Galaxy S23 FE",
        slug: "samsung-galaxy-s23-fe",
        releaseDate: new Date("2023-10-26"),
        thumbnail: "telefon-vergisi-hesaplayici/thumb/samsung-galaxy-s23-fe.webp",
        url: buildUrl("samsung-galaxy-s23-fe"),
        ogImageName: "telefon-vergisi-hesaplayici-samsung-galaxy-s23-fe.jpg",
        ...buildPageMeta("Samsung Galaxy S23 FE'nin")
    },
    {
        id: 12,
        brandId: 2,
        title: "Galaxy S23 Ultra",
        slug: "samsung-galaxy-s23-ultra",
        releaseDate: new Date("2023-02-01"),
        thumbnail: "telefon-vergisi-hesaplayici/thumb/samsung-galaxy-s23-ultra.webp",
        url: buildUrl("samsung-galaxy-s23-ultra"),
        ogImageName: "telefon-vergisi-hesaplayici-samsung-galaxy-s23-ultra.jpg",
        ...buildPageMeta("Samsung Galaxy S23 Ultra'nın")
    },

    {
        id: 15,
        brandId: 2,
        title: "Galaxy Z Fold5",
        slug: "samsung-galaxy-z-fold5",
        releaseDate: new Date("2023-07-26"),
        thumbnail: "telefon-vergisi-hesaplayici/thumb/samsung-galaxy-z-fold5.webp",
        url: buildUrl("samsung-galaxy-z-fold5"),
        ogImageName: "telefon-vergisi-hesaplayici-samsung-galaxy-z-fold5.jpg",
        ...buildPageMeta("Samsung Galaxy Z Fold5'in")
    },
    {
        id: 13,
        brandId: 2,
        title: "Galaxy Z Fold4",
        slug: "samsung-galaxy-z-fold4",
        releaseDate: new Date("2022-08-25"),
        thumbnail: "telefon-vergisi-hesaplayici/thumb/samsung-galaxy-z-fold4.webp",
        url: buildUrl("samsung-galaxy-z-fold4"),
        ogImageName: "telefon-vergisi-hesaplayici-samsung-galaxy-z-fold4.jpg",
        ...buildPageMeta("Samsung Galaxy Z Fold4'ün")
    },

    {
        id: 16,
        brandId: 2,
        title: "Galaxy Z Flip5",
        slug: "samsung-galaxy-z-flip5",
        releaseDate: new Date("2023-07-26"),
        thumbnail: "telefon-vergisi-hesaplayici/thumb/samsung-galaxy-z-flip5.webp",
        url: buildUrl("samsung-galaxy-z-flip5"),
        ogImageName: "telefon-vergisi-hesaplayici-samsung-galaxy-z-flip5.jpg",
        ...buildPageMeta("Samsung Galaxy Z Flip5'in")
    },
    {
        id: 14,
        brandId: 2,
        title: "Galaxy Z Flip4",
        slug: "samsung-galaxy-z-flip4",
        releaseDate: new Date("2022-08-26"),
        thumbnail: "telefon-vergisi-hesaplayici/thumb/samsung-galaxy-z-flip4.webp",
        url: buildUrl("samsung-galaxy-z-flip4"),
        ogImageName: "telefon-vergisi-hesaplayici-samsung-galaxy-z-flip4.jpg",
        ...buildPageMeta("Samsung Galaxy Z Flip4'ün")
    }
];
