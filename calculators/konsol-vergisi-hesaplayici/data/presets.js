const buildUrl = slug => `/konsol-vergisi-hesaplayici/${slug}/`;

export default [
    {
        id: 14,
        brandId: 3,
        title: "PlayStation 5",
        slug: "playstation-5",
        releaseDate: new Date("2020-11-12"),
        thumbnail: "konsol-vergisi-hesaplayici/img/sony-playstation-5.png",
        url: buildUrl("playstation-5"),
        ogImageName: "konsol-vergisi-hesaplayici-playstation-5.jpg",
        pageTitle: "PlayStation 5'in vergisi ne kadar?",
        pageDescription: "Satın aldığınız bir PlayStation 5'in yurt içi ve yurt dışı fiyatlarına ne kadar vergi uygulandığını hesaplayın."
    },
    {
        id: 15,
        brandId: 3,
        title: "PlayStation VR2",
        slug: "playstation-vr2",
        releaseDate: new Date("2022-02-22"),
        thumbnail: "konsol-vergisi-hesaplayici/img/sony-playstation-vr2.png",
        url: buildUrl("playstation-vr2"),
        ogImageName: "konsol-vergisi-hesaplayici-playstation-vr2.jpg",
        pageTitle: "PlayStation V2'nin vergisi ne kadar?",
        pageDescription: "Satın aldığınız bir PlayStation V2'nin yurt içi ve yurt dışı fiyatlarına ne kadar vergi uygulandığını hesaplayın."
    },
    {
        id: 16,
        brandId: 4,
        title: "Xbox Series S",
        slug: "xbox-series-s",
        releaseDate: new Date("2020-11-10"),
        thumbnail: "konsol-vergisi-hesaplayici/img/microsoft-xbox-series-s.png",
        url: buildUrl("xbox-series-s"),
        ogImageName: "konsol-vergisi-hesaplayici-xbox-series-s.jpg",
        pageTitle: "Xbox Series S'nin vergisi ne kadar?",
        pageDescription: "Satın aldığınız bir Xbox Series S'nin yurt içi ve yurt dışı fiyatlarına ne kadar vergi uygulandığını hesaplayın."
    },
    {
        id: 17,
        brandId: 4,
        title: "Xbox Series X",
        slug: "xbox-series-x",
        releaseDate: new Date("2020-11-10"),
        thumbnail: "konsol-vergisi-hesaplayici/img/microsoft-xbox-series-x.png",
        url: buildUrl("xbox-series-x"),
        ogImageName: "konsol-vergisi-hesaplayici-xbox-series-x.jpg",
        pageTitle: "Xbox Series X'in vergisi ne kadar?",
        pageDescription: "Satın aldığınız bir Xbox Series X'in yurt içi ve yurt dışı fiyatlarına ne kadar vergi uygulandığını hesaplayın."
    },
    {
        id: 18,
        brandId: 5,
        title: "Nintendo Switch",
        slug: "nintendo-switch",
        releaseDate: new Date("2017-03-03"),
        thumbnail: "konsol-vergisi-hesaplayici/img/nintendo-switch.png",
        url: buildUrl("nintendo-switch"),
        ogImageName: "konsol-vergisi-hesaplayici-nintendo-switch.jpg",
        pageTitle: "Nintendo Switch'in vergisi ne kadar?",
        pageDescription: "Satın aldığınız bir Nintendo Switch'in yurt içi ve yurt dışı fiyatlarına ne kadar vergi uygulandığını hesaplayın."
    }
];
