const fs = require("fs");
const path = require("path");

// create-csp-nonce-txt.js
const cspNonce = fs.readFileSync(path.join(__dirname, "csp-nonce.txt"), "UTF8");

const objectToCspHeader = object => {
    const cspHeader = [];
    for (const [key, values] of Object.entries(object)) {
        if (values.length > 0) {
            cspHeader.push(`${key} ${values.join(" ")}`);
        } else {
            cspHeader.push(`${key}`);
        }
    }
    return cspHeader.join(";");
};

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
                    {
                        key: "Content-Security-Policy",
                        value: objectToCspHeader({
                            "script-src": [
                                "'self'",
                                `'nonce-${cspNonce}'`,
                                "https://www.google.com/recaptcha/",
                                "https://www.gstatic.com/recaptcha/",
                                "https://www.googletagmanager.com",
                                "c.disquscdn.com",
                                "disqus.com",
                                "vergihesaplayici.disqus.com",
                                "https://cdn.jsdelivr.net"
                            ],
                            "frame-src": [
                                "'self'",
                                "https://www.google.com/recaptcha/",
                                "https://recaptcha.google.com/recaptcha/",
                                "https://ghbtns.com/",
                                "disqus.com",
                                "c.disquscdn.com"
                            ],
                            "img-src": [
                                "'self'",
                                "data:",
                                "www.googletagmanager.com",
                                "c.disquscdn.com",
                                "referrer.disqus.com"
                            ],
                            /* "style-src": [
                                "'self'",
                                `'nonce-${cspNonce}'`,
                                "fonts.googleapis.com",
                                "c.disquscdn.com"
                            ], */
                            "font-src": [
                                "fonts.gstatic.com"
                            ]
                        })
                    }
                ]
            },
            {
                source: "/sw.js",
                headers: [
                    {
                        key: "Cache-Control",
                        value: "no-cache, no-store, must-revalidate"
                    }
                ]
            },
            {
                source: "/index.html",
                headers: [
                    {
                        key: "Cache-Control",
                        value: "no-cache, no-store, must-revalidate"
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
        redirects: [
            {
                source: "/hesaplayicilar/telefon-vergisi-hesaplayici",
                destination: "/telefon-vergisi-hesaplayici/",
                type: 301
            },
            {
                source: "/hesaplayicilar/konsol-vergisi-hesaplayici",
                destination: "/konsol-vergisi-hesaplayici/",
                type: 301
            },
            {
                source: "/hesaplayicilar/kdv-hesaplayici",
                destination: "/kdv-hesaplayici/",
                type: 301
            },
            {
                source: "/hesaplayicilar/telefon-vergisi-hesaplayici/",
                destination: "/telefon-vergisi-hesaplayici/",
                type: 301
            },
            {
                source: "/hesaplayicilar/konsol-vergisi-hesaplayici/",
                destination: "/konsol-vergisi-hesaplayici/",
                type: 301
            },
            {
                source: "/hesaplayicilar/kdv-hesaplayici/",
                destination: "/kdv-hesaplayici/",
                type: 301
            }
        ]
    },
    emulators: {
        hosting: {
            port: 8080
        },
        ui: {
            enabled: true
        }
    }
};

fs.writeFileSync(path.join(__dirname, "firebase.json"), JSON.stringify(firebaseJson));

console.log("firebase.json created");
