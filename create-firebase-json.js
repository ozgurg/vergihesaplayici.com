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

    ["yazilar/yillik-gelir-vergisi-nedir",                                      "yazilar/0001-yillik-gelir-vergisi"],
    ["yazilar/zirai-kazanc-gelir-vergisi-nedir",                                "yazilar/0002-zirai-kazanc-gelir-vergisi"],
    ["yazilar/gelir-vergisi-stopaji-muhtasar-beyanname-nedir",                  "yazilar/0003-gelir-vergisi-stopaji-muhtasar-beyanname"],
    ["yazilar/gelir-goturu-ticari-kazanc-nedir",                                "yazilar/0004-gelir-goturu-ticari-kazanc"],
    ["yazilar/gelir-goturu-serbest-meslek-kazanci-nedir",                       "yazilar/0005-gelir-goturu-serbest-meslek-kazanci"],
    ["yazilar/gelir-goturu-ucret-nedir",                                        "yazilar/0006-gelir-goturu-ucret"],
    ["yazilar/dagitilmayan-kar-stopaji-nedir",                                  "yazilar/0007-dagitilmayan-kar-stopaji"],
    ["yazilar/kurumlar-vergisi-nedir",                                          "yazilar/0010-kurumlar-vergisi"],
    ["yazilar/kurumlar-vergisi-stopaji-kvkm24-nedir",                           "yazilar/0011-kurumlar-vergisi-stopaji-kvkm24"],
    ["yazilar/gelir-vergisi-gmsi-nedir",                                        "yazilar/0012-gelir-vergisi-gmsi"],
    ["yazilar/basit-usulde-ticari-kazanc-nedir",                                "yazilar/0014-basit-usulde-ticari-kazanc"],
    ["yazilar/gercek-usulde-katma-deger-vergisi-nedir",                         "yazilar/0015-gercek-usulde-katma-deger-vergisi"],
    ["yazilar/goturu-usulde-katma-deger-vergisi-nedir",                         "yazilar/0017-goturu-usulde-katma-deger-vergisi"],
    ["yazilar/mep-istirakcisi-kurumlar-vergisi-nedir",                          "yazilar/0020-mep-istirakcisi-kurumlar-vergisi"],
    ["yazilar/banka-muameleleri-vergisi-nedir",                                 "yazilar/0021-banka-muameleleri-vergisi"],
    ["yazilar/sigorta-muameleleri-vergisi-nedir",                               "yazilar/0022-sigorta-muameleleri-vergisi"],
    ["yazilar/gelir-vergisi-gecici-vergi-nedir",                                "yazilar/0027-gelir-vergisi-gecici-vergi"],
    ["yazilar/gelir-gecici-vergi-nedir",                                        "yazilar/0032-gelir-gecici-vergi"],
    ["yazilar/kurum-gecici-vergi-nedir",                                        "yazilar/0033-kurum-gecici-vergi"],
    ["yazilar/damga-vergisi-beyannameli-damga-vergisi-mukellefi-nedir",         "yazilar/0040-damga-vergisi-beyannameli-damga-vergisi-mukellefi"],
    ["yazilar/akaryakit-tuketim-vergisi-nedir",                                 "yazilar/0046-akaryakit-tuketim-vergisi"],
    ["yazilar/gelir-vergisi-mukellefleri-talih-oyunlari-asgari-vergisi-nedir",  "yazilar/0048-gelir-vergisi-mukellefleri-talih-oyunlari-asgari-vergisi"],
    ["yazilar/her-turlu-ispirtolar-ve-fuzel-yagindan-alinan-ek-vergi-nedir",    "yazilar/0049-her-turlu-ispirtolar-ve-fuzel-yagindan-alinan-ek-vergi"],

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
                    { // https://hstspreload.org/
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
                    { // Deprecated header
                        key: "X-XSS-Protection",
                        value: "1; mode=block"
                    },
                    {
                        key: "X-Permitted-Cross-Domain-Policies",
                        value: "none"
                    },

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
        redirects: redirections301.map(([_from, _to]) => ({
            source: `/${_from}/`,
            destination: `/${_to}/`,
            type: 301
        }))
    }
};


const outputPath = path.join(__dirname, "firebase.json");
fs.writeFileSync(outputPath, JSON.stringify(firebaseJson, null, 2));
console.info("[create-firebase-json] ✅ Done!");
