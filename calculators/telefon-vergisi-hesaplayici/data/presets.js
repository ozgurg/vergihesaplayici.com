const buildUrl = slug => `/telefon-vergisi-hesaplayici/${slug}/`;

const buildPageMeta = phoneNameWithPossession => ({
    pageTitle: `${phoneNameWithPossession} vergisi ne kadar?`,
    pageDescription: `${phoneNameWithPossession} vergisini hesaplamak için başta ÖTV gibi tüm telefon vergilerini hesaplama yeteneğine sahip Telefon Vergisi Hesaplayıcı aracını kullanın. Vergilerin ne kadar uygulandığını ve vergisiz telefon fiyatını öğrenin. Yurt içi ve yurt dışı fiyatlarını karşılaştırın.`
});

export default [
    {
        id: 1,
        brandId: 1,
        title: "iPhone 14 Pro",
        slug: "iphone-14-pro", // TODO: "apple-" prefix will be added
        releaseDate: new Date("2022-09-07"),
        thumbnail: "telefon-vergisi-hesaplayici/img/apple-iphone-14-pro.png",
        url: buildUrl("iphone-14-pro"), // TODO: "apple-" prefix will be added
        ogImageName: "telefon-vergisi-hesaplayici-apple-iphone-14-pro.jpg",
        ...buildPageMeta("Apple iPhone 14 Pro'nun")
    },
    {
        id: 2,
        brandId: 1,
        title: "iPhone 14 Pro Max",
        slug: "iphone-14-pro-max", // TODO: "apple-" prefix will be added
        releaseDate: new Date("2022-09-07"),
        thumbnail: "telefon-vergisi-hesaplayici/img/apple-iphone-14-pro-max.png",
        url: buildUrl("iphone-14-pro-max"), // TODO: "apple-" prefix will be added
        ogImageName: "telefon-vergisi-hesaplayici-apple-iphone-14-pro-max.jpg",
        ...buildPageMeta("Apple iPhone 14 Pro Max'in")
    },
    {
        id: 3,
        brandId: 1,
        title: "iPhone 14",
        slug: "iphone-14", // TODO: "apple-" prefix will be added
        releaseDate: new Date("2022-09-07"),
        thumbnail: "telefon-vergisi-hesaplayici/img/apple-iphone-14.png",
        url: buildUrl("iphone-14"), // TODO: "apple-" prefix will be added
        ogImageName: "telefon-vergisi-hesaplayici-apple-iphone-14.jpg",
        ...buildPageMeta("Apple iPhone 14'ün")
    },
    {
        id: 4,
        brandId: 1,
        title: "iPhone 14 Plus",
        slug: "iphone-14-plus", // TODO: "apple-" prefix will be added
        releaseDate: new Date("2022-09-07"),
        thumbnail: "telefon-vergisi-hesaplayici/img/apple-iphone-14-plus.png",
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
        thumbnail: "telefon-vergisi-hesaplayici/img/apple-iphone-13-mini.png",
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
        thumbnail: "telefon-vergisi-hesaplayici/img/apple-iphone-13.png",
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
        thumbnail: "telefon-vergisi-hesaplayici/img/apple-iphone-se-3-2022.png",
        url: buildUrl("iphone-se-3-2022"), // TODO: "apple-" prefix will be added
        ogImageName: "telefon-vergisi-hesaplayici-apple-iphone-se-2022.jpg",
        ...buildPageMeta("Apple iPhone SE 3'ün (2022)")
    },
    {
        id: 8,
        brandId: 1,
        title: "iPhone 12",
        slug: "iphone-12", // TODO: "apple-" prefix will be added
        releaseDate: new Date("2020-10-13"),
        thumbnail: "telefon-vergisi-hesaplayici/img/apple-iphone-12.png",
        url: buildUrl("iphone-12"), // TODO: "apple-" prefix will be added
        ogImageName: "telefon-vergisi-hesaplayici-apple-iphone-12.jpg",
        ...buildPageMeta("Apple iPhone 12'nin")
    },
    {
        id: 9,
        brandId: 1,
        title: "Vision Pro",
        slug: "apple-vision-pro",
        releaseDate: new Date("2023-06-05"),
        thumbnail: "telefon-vergisi-hesaplayici/img/apple-vision-pro.png",
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
        thumbnail: "telefon-vergisi-hesaplayici/img/samsung-galaxy-s23.png",
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
        thumbnail: "telefon-vergisi-hesaplayici/img/samsung-galaxy-s23-plus.png",
        url: buildUrl("samsung-galaxy-s23-plus"),
        ogImageName: "telefon-vergisi-hesaplayici-samsung-galaxy-s23-plus.jpg",
        ...buildPageMeta("Samsung Galaxy S23+'ın")
    },
    {
        id: 12,
        brandId: 2,
        title: "Galaxy S23 Ultra",
        slug: "samsung-galaxy-s23-ultra",
        releaseDate: new Date("2023-02-01"),
        thumbnail: "telefon-vergisi-hesaplayici/img/samsung-galaxy-s23-ultra.png",
        url: buildUrl("samsung-galaxy-s23-ultra"),
        ogImageName: "telefon-vergisi-hesaplayici-samsung-galaxy-s23-ultra.jpg",
        ...buildPageMeta("Samsung Galaxy S23 Ultra'nın")
    },
    {
        id: 13,
        brandId: 2,
        title: "Galaxy Z Fold4",
        slug: "samsung-galaxy-z-fold4",
        releaseDate: new Date("2022-10-25"),
        thumbnail: "telefon-vergisi-hesaplayici/img/samsung-galaxy-z-fold4.png",
        url: buildUrl("samsung-galaxy-z-fold4"),
        ogImageName: "telefon-vergisi-hesaplayici-samsung-galaxy-z-fold4.jpg",
        ...buildPageMeta("Samsung Galaxy Z Fold4'ün")
    },
    {
        id: 14,
        brandId: 2,
        title: "Galaxy Z Flip4",
        slug: "samsung-galaxy-z-flip4",
        releaseDate: new Date("2022-10-26"),
        thumbnail: "telefon-vergisi-hesaplayici/img/samsung-galaxy-z-flip4.png",
        url: buildUrl("samsung-galaxy-z-flip4"),
        ogImageName: "telefon-vergisi-hesaplayici-samsung-galaxy-z-flip4.jpg",
        ...buildPageMeta("Samsung Galaxy Z Flip4'ün")
    }
];
