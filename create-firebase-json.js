const fs = require("fs");
const path = require("path");

const _objectToCspHeader = object => {
    const cspHeader = [];
    for (const [_key, _values] of Object.entries(object)) {
        cspHeader.push(
            _values.length > 0 ? `${_key} ${_values.join(" ")}` : _key
        );
    }
    return cspHeader.join(";");
};

// [0] = source (from), [1] = destination (to)
const redirections301 = [
    [
        "/konsol-vergisi-hesaplayici/apple-vision-pro/",
        "/telefon-vergisi-hesaplayici/apple-vision-pro/"
    ],
    [
        "/konsol-vergisi-hesaplayici/playstation-5/",
        "/konsol-vergisi-hesaplayici/sony-playstation-5/"
    ],
    [
        "/konsol-vergisi-hesaplayici/playstation-vr2",
        "/konsol-vergisi-hesaplayici/sony-playstation-vr2/"
    ],
    [
        "/konsol-vergisi-hesaplayici/xbox-series-s/",
        "/konsol-vergisi-hesaplayici/microsoft-xbox-series-s/"
    ],
    [
        "/konsol-vergisi-hesaplayici/xbox-series-x/",
        "/konsol-vergisi-hesaplayici/microsoft-xbox-series-x/"
    ],
    [
        "/konsol-vergisi-hesaplayici/steam-deck/",
        "/konsol-vergisi-hesaplayici/valve-steam-deck/"
    ],

    [
        "/hesaplayicilar/telefon-vergisi-hesaplayici",
        "/telefon-vergisi-hesaplayici/"
    ],
    [
        "/hesaplayicilar/konsol-vergisi-hesaplayici",
        "/konsol-vergisi-hesaplayici/"
    ],
    [
        "/hesaplayicilar/kdv-hesaplayici",
        "/kdv-hesaplayici/"
    ],
    [
        "/hesaplayicilar/telefon-vergisi-hesaplayici/",
        "/telefon-vergisi-hesaplayici/"
    ],
    [
        "/hesaplayicilar/konsol-vergisi-hesaplayici/",
        "/konsol-vergisi-hesaplayici/"
    ],
    [
        "/hesaplayicilar/kdv-hesaplayici/",
        "/kdv-hesaplayici/"
    ],

    [
        "/yazilar/zirai-kazanc-vergisi-nedir/",
        "/yazilar/zirai-kazanc-gelir-vergisi-nedir/"
    ],
    [
        "/yazilar/luks-tuketimden-daha-fazla-vergi-alinmali-midir/",
        "/yazilar/luks-tuketimden-daha-fazla-vergi-alinmali-mi/"
    ],
    [
        "/yazilar/verginin-vergisi-hangi-ulke-icat-etmistir/",
        "/yazilar/verginin-vergisini-hangi-ulke-icat-etmistir/"
    ]
];

// create-csp-nonce-txt.js
const cspNonce = fs.readFileSync(path.join(__dirname, "csp-nonce.txt"), { encoding: "utf-8" });

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
            {
                source: "**",
                headers: [
                    { // Commented directives break our app.
                        key: "Content-Security-Policy",
                        value: _objectToCspHeader({
                            "base-uri": [
                                "'self'"
                            ],
                            "object-src": [
                                "'none'"
                            ],
                            "script-src": [
                                "'self'",
                                `'nonce-${cspNonce}'`,
                                "'unsafe-inline'",
                                // "'strict-dynamic'",
                                "https://www.google.com/recaptcha/",
                                "https://www.gstatic.com/recaptcha/",
                                "https://www.googletagmanager.com",
                                "https://cdn.jsdelivr.net" // For Workbox in static/sw.js
                            ],
                            "frame-src": [
                                "'self'",
                                "https://www.google.com/recaptcha/",
                                "https://recaptcha.google.com/recaptcha/"
                            ],
                            "img-src": [
                                "'self'",
                                "data:",
                                "www.googletagmanager.com"
                            ],
                            /* "style-src": [
                                "'self'",
                                `'nonce-${cspNonce}'`,
                                "fonts.googleapis.com"
                            ], */
                            "font-src": [
                                "fonts.gstatic.com"
                            ]
                            /* "require-trusted-types-for": [
                                "'script'"
                            ] */
                        })
                    }
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
                source: "**/*.@(jpg|jpeg|gif|png|svg|webp|js|css|eot|otf|ttf|ttc|woff|woff2|font.css|mp4|webm)",
                headers: [
                    {
                        key: "Cache-Control",
                        value: "max-age=31536000"
                    }
                ]
            }
        ],
        redirects: redirections301.map(_redirection => ({
            source: _redirection[0],
            destination: _redirection[0],
            type: 301
        }))
    },
    emulators: {
        hosting: {
            port: 8026
        },
        ui: {
            enabled: true
        }
    }
};

const filePath = path.join(__dirname, "firebase.json");
fs.writeFileSync(filePath, JSON.stringify(firebaseJson));

console.log(`${path.basename(filePath)} created`);
