import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// oxlint-disable-next-line no-unused-vars
const objectToCspHeader = object => {
    const cspHeader = [];
    for (const [_key, _values] of Object.entries(object)) {
        cspHeader.push(
            _values.length > 0 ? `${_key} ${_values.join(" ")}` : _key
        );
    }
    return cspHeader.join(";");
};

// [0] = source (from)
// [1] = destination (to)
const redirections301 = [
    ["telefon", "telefon-vergisi-hesaplayici"],

    ["konsol-vergisi-hesaplayici/apple-vision-pro", "telefon-vergisi-hesaplayici/apple-vision-pro"],
    ["konsol-vergisi-hesaplayici/playstation-5", "konsol-vergisi-hesaplayici/sony-playstation-5"],
    ["konsol-vergisi-hesaplayici/playstation-vr2", "konsol-vergisi-hesaplayici/sony-playstation-vr2"],
    ["konsol-vergisi-hesaplayici/xbox-series-s", "konsol-vergisi-hesaplayici/microsoft-xbox-series-s"],
    ["konsol-vergisi-hesaplayici/xbox-series-x", "konsol-vergisi-hesaplayici/microsoft-xbox-series-x"],
    ["konsol-vergisi-hesaplayici/steam-deck", "konsol-vergisi-hesaplayici/valve-steam-deck"],

    ["hesaplayicilar/telefon-vergisi-hesaplayici", "telefon-vergisi-hesaplayici"],
    ["hesaplayicilar/konsol-vergisi-hesaplayici", "konsol-vergisi-hesaplayici"],
    ["hesaplayicilar/kdv-hesaplayici", "kdv-hesaplayici"],
    ["hesaplayicilar/telefon-vergisi-hesaplayici", "telefon-vergisi-hesaplayici"],
    ["hesaplayicilar/konsol-vergisi-hesaplayici", "konsol-vergisi-hesaplayici"],
    ["hesaplayicilar/kdv-hesaplayici", "kdv-hesaplayici"],

    ["gumruk-vergisi-hesaplayici", "gumruk-vergisi"],

    ["yazilar/zirai-kazanc-vergisi-nedir", "yazilar/zirai-kazanc-gelir-vergisi-nedir"],
    ["yazilar/luks-tuketimden-daha-fazla-vergi-alinmali-midir", "yazilar/luks-tuketimden-daha-fazla-vergi-alinmali-mi"],
    ["yazilar/verginin-vergisi-hangi-ulke-icat-etmistir", "yazilar/verginin-vergisini-hangi-ulke-icat-etmistir"],
    ["yazilar/gelir-vergisi-s-muhtasar-nedir", "yazilar/gelir-vergisi-stopaji-muhtasar-beyanname-nedir"],
    ["yazilar/gelir-v-m-talih-oyunlari-asgari-vergi-nedir", "yazilar/gelir-vergisi-mukellefleri-talih-oyunlari-asgari-vergisi-nedir"],
    ["yazilar/kurumlar-v-m-talih-oyunlari-asgari-vergi-nedir", "yazilar/kurumlar-vergisi-mukellefleri-talih-oyunlari-asgari-vergisi-nedir"],

    ["yazilar/yillik-gelir-vergisi-nedir", "yazilar/0001-yillik-gelir-vergisi"],
    ["yazilar/zirai-kazanc-gelir-vergisi-nedir", "yazilar/0002-zirai-kazanc-gelir-vergisi"],
    ["yazilar/gelir-vergisi-stopaji-muhtasar-beyanname-nedir", "yazilar/0003-gelir-vergisi-stopaji-muhtasar-beyanname"],
    ["yazilar/gelir-goturu-ticari-kazanc-nedir", "yazilar/0004-gelir-goturu-ticari-kazanc"],
    ["yazilar/gelir-goturu-serbest-meslek-kazanci-nedir", "yazilar/0005-gelir-goturu-serbest-meslek-kazanci"],
    ["yazilar/gelir-goturu-ucret-nedir", "yazilar/0006-gelir-goturu-ucret"],
    ["yazilar/dagitilmayan-kar-stopaji-nedir", "yazilar/0007-dagitilmayan-kar-stopaji"],
    ["yazilar/kurumlar-vergisi-nedir", "yazilar/0010-kurumlar-vergisi"],
    ["yazilar/kurumlar-vergisi-stopaji-kvkm24-nedir", "yazilar/0011-kurumlar-vergisi-stopaji-kvkm24"],
    ["yazilar/gelir-vergisi-gmsi-nedir", "yazilar/0012-gelir-vergisi-gmsi"],
    ["yazilar/basit-usulde-ticari-kazanc-nedir", "yazilar/0014-basit-usulde-ticari-kazanc"],
    ["yazilar/gercek-usulde-katma-deger-vergisi-nedir", "yazilar/0015-gercek-usulde-katma-deger-vergisi"],
    ["yazilar/goturu-usulde-katma-deger-vergisi-nedir", "yazilar/0017-goturu-usulde-katma-deger-vergisi"],
    ["yazilar/mep-istirakcisi-kurumlar-vergisi-nedir", "yazilar/0020-mep-istirakcisi-kurumlar-vergisi"],
    ["yazilar/banka-muameleleri-vergisi-nedir", "yazilar/0021-banka-muameleleri-vergisi"],
    ["yazilar/sigorta-muameleleri-vergisi-nedir", "yazilar/0022-sigorta-muameleleri-vergisi"],
    ["yazilar/gelir-vergisi-gecici-vergi-nedir", "yazilar/0027-gelir-vergisi-gecici-vergi"],
    ["yazilar/gelir-gecici-vergi-nedir", "yazilar/0032-gelir-gecici-vergi"],
    ["yazilar/kurum-gecici-vergi-nedir", "yazilar/0033-kurum-gecici-vergi"],
    ["yazilar/damga-vergisi-beyannameli-damga-vergisi-mukellefi-nedir", "yazilar/0040-damga-vergisi-beyannameli-damga-vergisi-mukellefi"],
    ["yazilar/akaryakit-tuketim-vergisi-nedir", "yazilar/0046-akaryakit-tuketim-vergisi"],
    ["yazilar/gelir-vergisi-mukellefleri-talih-oyunlari-asgari-vergisi-nedir", "yazilar/0048-gelir-vergisi-mukellefleri-talih-oyunlari-asgari-vergisi"],
    ["yazilar/her-turlu-ispirtolar-ve-fuzel-yagindan-alinan-ek-vergi-nedir", "yazilar/0049-her-turlu-ispirtolar-ve-fuzel-yagindan-alinan-ek-vergi"],
    ["yazilar/kurumlar-vergisi-mukellefleri-talih-oyunlari-asgari-vergisi-nedir", "yazilar/0050-kurumlar-vergisi-mukellefleri-talih-oyunlari-asgari-vergisi"],
    ["yazilar/kurumlar-vergisi-kurum-gecici-vergi-nedir", "yazilar/0053-kurumlar-vergisi-kurum-gecici-vergi"],
    ["yazilar/oyun-kagitlarindan-alinan-ek-vergi-nedir", "yazilar/0056-oyun-kagitlarindan-alinan-ek-vergi"],
    ["yazilar/rontgen-filmlerinden-alinan-ek-vergi-nedir", "yazilar/0057-rontgen-filmlerinden-alinan-ek-vergi"],
    ["yazilar/mulga-maden-fonu-nedir", "yazilar/0060-mulga-maden-fonu"],
    ["yazilar/kaynak-kullanimi-destekleme-fonu-kesintisi-nedir", "yazilar/0061-kaynak-kullanimi-destekleme-fonu-kesintisi"],
    ["yazilar/mulga-kooperatifcilik-tanitma-ve-egitim-fonu-nedir", "yazilar/0062-mulga-kooperatifcilik-tanitma-ve-egitim-fonu"],
    ["yazilar/gelir-vergisi-kanunu-gecici-67-11-maddesine-gore-yapilan-ihtiyari-beyan-nedir", "yazilar/0067-gelir-vergisi-kanunu-gecici-67-11-maddesine-gore-yapilan-ihtiyari-beyan"],
    ["yazilar/petrol-ve-dogalgaz-urunlerine-iliskin-ozel-tuketim-vergisi-nedir", "yazilar/0071-petrol-ve-dogalgaz-urunlerine-iliskin-ozel-tuketim-vergisi"],
    ["yazilar/kolali-gazoz-alkollu-icecekler-ve-tutun-mamullerine-iliskin-ozel-tuketim-vergisi-nedir", "yazilar/0073-kolali-gazoz-alkollu-icecekler-ve-tutun-mamullerine-iliskin-ozel-tuketim-vergisi"],
    ["yazilar/dayanikli-tuketim-ve-diger-mallara-ilisikin-ozel-tuketim-vergisi-nedir", "yazilar/0074-dayanikli-tuketim-ve-diger-mallara-ilisikin-ozel-tuketim-vergisi"],
    ["yazilar/alkollu-iceceklere-iliskin-ozel-tuketim-vergisi-nedir", "yazilar/0075-alkollu-iceceklere-iliskin-ozel-tuketim-vergisi"],
    ["yazilar/tutun-mamullerine-iliskin-ozel-tuketim-vergisi-nedir", "yazilar/0076-tutun-mamullerine-iliskin-ozel-tuketim-vergisi"],
    ["yazilar/kolali-gazozlara-iliskin-ozel-tuketim-vergisi-nedir", "yazilar/0077-kolali-gazozlara-iliskin-ozel-tuketim-vergisi"],
    ["yazilar/tutun-mamullerine-iliskin-ek-vergi-nedir", "yazilar/0091-tutun-mamullerine-iliskin-ek-vergi"],
    ["yazilar/her-turlu-alkollu-ickilere-iliskin-ek-vergi-nedir", "yazilar/0092-her-turlu-alkollu-ickilere-iliskin-ek-vergi"],
    ["yazilar/sair-sarap-ve-biralara-iliskin-ek-vergi-nedir", "yazilar/0093-sair-sarap-ve-biralara-iliskin-ek-vergi"],
    ["yazilar/her-turlu-alkolsuz-iceceklerden-alinan-ek-vergi-nedir", "yazilar/0094-her-turlu-alkolsuz-iceceklerden-alinan-ek-vergi"],
    ["yazilar/egitim-genclik-spor-ve-saglik-hizmetleri-vergisi-nedir", "yazilar/1013-egitim-genclik-spor-ve-saglik-hizmetleri-vergisi"],
    ["yazilar/mahsuplardan-kesilen-damga-vergisi-nedir", "yazilar/1018-mahsuplardan-kesilen-damga-vergisi"],
    ["yazilar/5254-sayili-kanuna-gore-muhtac-ciftcilere-verilen-odunc-tohumluklardan-hazine-alacagina-donusenler-ait-faiz-nedir", "yazilar/1026-5254-sayili-kanuna-gore-muhtac-ciftcilere-verilen-odunc-tohumluklardan-hazine-alacagina-donusenler-ait-faiz"],
    ["yazilar/pismanlik-zammi-nedir", "yazilar/1030-pismanlik-zammi"],
    ["yazilar/trafik-muayenesi-para-cezalari-nedir", "yazilar/1037-trafik-muayenesi-para-cezalari"],
    ["yazilar/egitime-katki-payi-nedir", "yazilar/1042-egitime-katki-payi"],
    ["yazilar/ozel-islem-vergisi-nedir", "yazilar/1043-ozel-islem-vergisi"],
    ["yazilar/tevkifattan-alinan-damga-vergisi-nedir", "yazilar/1046-tevkifattan-alinan-damga-vergisi"],
    ["yazilar/damga-vergisi-nedir", "yazilar/1047-damga-vergisi"],
    ["yazilar/5035-sayili-kanuna-gore-damga-vergisi-nedir", "yazilar/1048-5035-sayili-kanuna-gore-damga-vergisi"],
    ["yazilar/vergi-barisi-tefe-tutari-nedir", "yazilar/1050-vergi-barisi-tefe-tutari"],
    ["yazilar/vergi-barisi-gec-odeme-zammi-nedir", "yazilar/1051-vergi-barisi-gec-odeme-zammi"],
    ["yazilar/5335-sayili-kanuna-gore-hazine-alacagina-donusen-tohumluk-kredilerine-ait-gec-odeme-zammi-nedir", "yazilar/1052-5335-sayili-kanuna-gore-hazine-alacagina-donusen-tohumluk-kredilerine-ait-gec-odeme-zammi"],
    ["yazilar/vergi-yargi-harclari-nedir", "yazilar/1067-vergi-yargi-harclari"],
    ["yazilar/gecikme-faizi-nedir", "yazilar/1084-gecikme-faizi"],
    ["yazilar/erken-odeme-indirimi-nedir", "yazilar/1087-erken-odeme-indirimi"],
    ["yazilar/vergi-ziyai-cezasi-nedir", "yazilar/3080-vergi-ziyai-cezasi"],
    ["yazilar/faiz-vergisi-nedir", "yazilar/4006-faiz-vergisi"],
    ["yazilar/gelir-dahili-tevkifat-nedir", "yazilar/4008-gelir-dahili-tevkifat"],
    ["yazilar/trafik-muayene-ucreti-hazine-payi-nedir", "yazilar/4037-trafik-muayene-ucreti-hazine-payi"],
    ["yazilar/seker-kanunu-idari-para-cezasi-nedir", "yazilar/9315-seker-kanunu-idari-para-cezasi"],
    ["yazilar/sorumlu-sifatiyla-verilen-otv-1-liste-nedir", "yazilar/9171-sorumlu-sifatiyla-verilen-otv-1-liste"],
    ["yazilar/mera-fonu-para-cezasi-nedir", "yazilar/9341-mera-fonu-para-cezasi"],
    ["yazilar/turizm-para-cezasi-nedir", "yazilar/9309-turizm-para-cezasi"],
    ["yazilar/5736-sayili-kanun-uyarinca-tahsil-edilecek-ecrimisil-gelirleri-nedir", "yazilar/9153-5736-sayili-kanun-uyarinca-tahsil-edilecek-ecrimisil-gelirleri"],
    ["yazilar/3516-sayili-kanuna-gore-olcu-ayar-para-cezasi-nedir", "yazilar/9307-3516-sayili-kanuna-gore-olcu-ayar-para-cezasi"],
    ["yazilar/1475-sayili-is-kanununa-bagli-para-cezasi-nedir", "yazilar/9306-1475-sayili-is-kanununa-bagli-para-cezasi"],
    ["yazilar/dsi-sulama-tesisleri-yatirim-bedeli-nedir", "yazilar/9201-dsi-sulama-tesisleri-yatirim-bedeli"],
    ["yazilar/telgraf-ve-telefon-kanunu-2-madde-idari-para-cezasi-nedir", "yazilar/9304-telgraf-ve-telefon-kanunu-2-madde-idari-para-cezasi"],
    ["yazilar/dsi-sulama-tesisleri-isletme-ve-bakim-ucreti-nedir", "yazilar/9200-dsi-sulama-tesisleri-isletme-ve-bakim-ucreti"],
    ["yazilar/kadastro-harclari-nedir", "yazilar/9162-kadastro-harclari"],
    ["yazilar/4915-ve-5035-sayili-kanuna-gore-ruhsat-harci-nedir", "yazilar/9148-4915-ve-5035-sayili-kanuna-gore-ruhsat-harci"],
    ["yazilar/mahalli-idarelerden-alinan-paylar-nedir", "yazilar/9133-mahalli-idarelerden-alinan-paylar"],
    ["yazilar/kilavuzluk-ve-romorkorculuk-hizmet-payi-nedir", "yazilar/9132-kilavuzluk-ve-romorkorculuk-hizmet-payi"],
    ["yazilar/veraset-ve-intikal-vergisi-sair-ivazsiz-intikaller-nedir", "yazilar/9131-veraset-ve-intikal-vergisi-sair-ivazsiz-intikaller"],
    ["yazilar/5254-sayili-kanuna-gore-muhtac-ciftcilere-verilen-odunc-tohumluklarin-hazine-alacagina-donusenler-nedir", "yazilar/9126-5254-sayili-kanuna-gore-muhtac-ciftcilere-verilen-odunc-tohumluklarin-hazine-alacagina-donusenler"],
    ["yazilar/agaclandirma-fonu-yonetmeligine-gore-verilen-kredilerden-geri-alinanlar-nedir", "yazilar/9125-agaclandirma-fonu-yonetmeligine-gore-verilen-kredilerden-geri-alinanlar"],
    ["yazilar/enerji-piyasasi-duzenleme-kurulunca-odenen-analiz-ucretinin-geri-alinmasi-nedir", "yazilar/9123-enerji-piyasasi-duzenleme-kurulunca-odenen-analiz-ucretinin-geri-alinmasi"],
    ["yazilar/gelir-vergisi-tevkifati-nedir", "yazilar/9113-gelir-vergisi-tevkifati"],
    ["yazilar/telekomunikasyon-kurumu-tarafindan-yatirilan-telgraf-ve-telefon-kanunu-idari-para-cezalari-nedir", "yazilar/9118-telekomunikasyon-kurumu-tarafindan-yatirilan-telgraf-ve-telefon-kanunu-idari-para-cezalari"],
    ["yazilar/2762-sayili-kanuna-gore-alinan-taviz-bedeli-nedir", "yazilar/9112-2762-sayili-kanuna-gore-alinan-taviz-bedeli"],
    ["yazilar/motorlu-tasitlar-vergisi-nedir", "yazilar/9034-motorlu-tasitlar-vergisi"],
    ["yazilar/ozel-iletisim-vergisi-nedir", "yazilar/4080-ozel-iletisim-vergisi"],
    ["yazilar/akaryakit-fiyat-istikrar-payi-nedir", "yazilar/4046-akaryakit-fiyat-istikrar-payi"],
    ["yazilar/tek-basina-alinabilen-damga-vergisi-nedir", "yazilar/4047-tek-basina-alinabilen-damga-vergisi"],
    ["yazilar/sans-oyunlari-vergisi-nedir", "yazilar/4048-sans-oyunlari-vergisi"],
    ["yazilar/5035-sayili-kanuna-gore-finansal-faaliyet-harci-nedir", "yazilar/4049-5035-sayili-kanuna-gore-finansal-faaliyet-harci"],
    ["yazilar/tekel-safi-hasilat-nedir", "yazilar/4050-tekel-safi-hasilat"],
    ["yazilar/net-aktif-vergisi-nedir", "yazilar/4078-net-aktif-vergisi"],
    ["yazilar/kiymetli-maden-ve-ziynet-esyasindan-alinan-vergi-nedir", "yazilar/4079-kiymetli-maden-ve-ziynet-esyasindan-alinan-vergi"],

    ["yazilar/telefon-vergisi", "telefon-vergisi-hesaplayici"],
    ["yazilar/konsol-vergisi", "konsol-vergisi-hesaplayici"],

    ["telefon-vergisi-hesaplayici/iphone-15-pro", "telefon-vergisi-hesaplayici/apple-iphone-15-pro"],
    ["telefon-vergisi-hesaplayici/iphone-15-pro-max", "telefon-vergisi-hesaplayici/apple-iphone-15-pro-max"],
    ["telefon-vergisi-hesaplayici/iphone-15", "telefon-vergisi-hesaplayici/apple-iphone-15"],
    ["telefon-vergisi-hesaplayici/iphone-15-plus", "telefon-vergisi-hesaplayici/apple-iphone-15-plus"],
    ["telefon-vergisi-hesaplayici/iphone-14-pro", "telefon-vergisi-hesaplayici/apple-iphone-14-pro"],
    ["telefon-vergisi-hesaplayici/iphone-14-pro-max", "telefon-vergisi-hesaplayici/apple-iphone-14-pro-max"],
    ["telefon-vergisi-hesaplayici/iphone-14", "telefon-vergisi-hesaplayici/apple-iphone-14"],
    ["telefon-vergisi-hesaplayici/iphone-14-plus", "telefon-vergisi-hesaplayici/apple-iphone-14-plus"],
    ["telefon-vergisi-hesaplayici/iphone-13-mini", "telefon-vergisi-hesaplayici/apple-iphone-13-mini"],
    ["telefon-vergisi-hesaplayici/iphone-13", "telefon-vergisi-hesaplayici/apple-iphone-13"],
    ["telefon-vergisi-hesaplayici/iphone-se-3-2022", "telefon-vergisi-hesaplayici/apple-iphone-se-3-2022"],
    ["telefon-vergisi-hesaplayici/iphone-12", "telefon-vergisi-hesaplayici/apple-iphone-12"]
];

// oxlint-disable-next-line no-unused-vars
const cspNonce = fs.readFileSync(path.join(__dirname, "csp-nonce.txt"), "utf8");

const firebaseJson = {
    hosting: {
        public: "./dist",
        trailingSlash: true,
        cleanUrls: true,
        ignore: [
            "firebase.json",
            "**/.*",
            "**/node_modules/**"
        ],
        rewrites: [
            {
                source: "**",
                destination: "/404.html"
            }
        ],
        headers: [
            /* TODO: Content-Security-Policy is experimental for now: https://docs.astro.build/en/reference/experimental-flags/csp/
            {
                source: "**",
                headers: [
                    {
                        key: "Content-Security-Policy",
                        value: objectToCspHeader({
                            "base-uri": ["'self'"],
                            "object-src": ["'none'"],
                            "script-src": [
                                "'self'",
                                `'nonce-${cspNonce}'`,
                                "https://www.google.com/recaptcha/",
                                "https://www.gstatic.com/recaptcha/",
                                "https://www.googletagmanager.com"
                            ],
                            "frame-src": [
                                "'self'",
                                "https://www.google.com/recaptcha/",
                                "https://recaptcha.google.com/recaptcha/"
                            ],
                            "img-src": [
                                "'self'",
                                "www.googletagmanager.com"
                            ],
                            "style-src": [
                                "'self'",
                                "fonts.googleapis.com"
                            ],
                            "font-src": [
                                "fonts.gstatic.com"
                            ]
                        })
                    }
                ]
            },
            */
            {
                source: "**",
                headers: [
                    {
                        // https://hstspreload.org/
                        key: "Strict-Transport-Security",
                        value: "max-age=63072000; includeSubDomains; preload"
                    },
                    {
                        key: "X-Frame-Options",
                        value: "SAMEORIGIN"
                    },
                    {
                        key: "X-Content-Type-Options",
                        value: "nosniff"
                    },
                    {
                        key: "Referrer-Policy",
                        value: "strict-origin-when-cross-origin"
                    },
                    {
                        // Deprecated header
                        key: "X-XSS-Protection",
                        value: "1; mode=block"
                    },
                    {
                        key: "X-Permitted-Cross-Domain-Policies",
                        value: "none"
                    }

                    // Disabled for TinyAdz
                    /* {
                        key: "Cross-Origin-Embedder-Policy",
                        value: "require-corp"
                    },
                    {
                        key: "Cross-Origin-Opener-Policy",
                        value: "same-origin"
                    },
                    {
                        key: "Cross-Origin-Resource-Policy",
                        value: "same-origin"
                    } */
                ]
            },
            {
                source: "/sw.js",
                headers: [
                    {
                        key: "Cache-Control",
                        value: "no-cache,no-store,must-revalidate"
                    }
                ]
            },
            {
                source: "/index.html",
                headers: [
                    {
                        key: "Cache-Control",
                        value: "no-cache,no-store,must-revalidate"
                    }
                ]
            },
            {
                source: "**/*.@(jpg|jpeg|gif|png|svg|webp|js|css|eot|otf|ttf|woff|woff2|mp4)",
                headers: [
                    {
                        key: "Cache-Control",
                        value: "max-age=31536000"
                    }
                ]
            },
            {
                // Static images such as favicons and Open Graph images
                source: "**/*.@(jpg|jpeg|png|svg|webp)",
                headers: [
                    {
                        key: "Cross-Origin-Resource-Policy",
                        value: "cross-origin"
                    }
                ]
            }
        ],
        redirects: [
            ...redirections301.map(([_from, _to]) => ({
                source: `/${_from}/`,
                destination: `/${_to}/`,
                type: 301
            })),
            ...redirections301.map(([_from, _to]) => ({
                source: _from,
                destination: `/${_to}/`,
                type: 301
            })),
            {
                source: "/public/",
                destination: "/",
                type: 301
            },
            {
                source: "/_nuxt/**",
                destination: "/",
                type: 301
            }
        ]
    }
};


const outputPath = path.join(__dirname, "firebase.json");
fs.writeFileSync(outputPath, JSON.stringify(firebaseJson, null, 2));
console.info("[create-firebase-json] ✅ Done!");
