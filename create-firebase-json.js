import fs from "node:fs";
import path from "node:path";

// [0] = source (from)
// [1] = destination (to)
const redirections301 = new Set();

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
        headers: [
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
                        value: "no-cache, no-store, must-revalidate"
                    },
                    {
                        key: "X-Robots-Tag",
                        value: "noindex, nofollow, noarchive"
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
                source: "**/*.@(jpg|jpeg|png|svg|webp|ico|gif)",
                headers: [
                    {
                        key: "Cache-Control",
                        value: "public, max-age=31536000"
                    }
                ]
            },
            {
                source: "**/*.@(js|css|eot|otf|ttf|woff|woff2|mp4)",
                headers: [
                    {
                        key: "Cache-Control",
                        value: "public, max-age=31536000, immutable"
                    }
                ]
            },
            {
                // Static images such as favicons and Open Graph images
                source: "**/*.@(jpg|jpeg|png|svg|webp|ico)",
                headers: [
                    {
                        key: "Cross-Origin-Resource-Policy",
                        value: "cross-origin"
                    }
                ]
            }
        ],
        redirects: redirections301.values().map(([_from, _to]) => ({
            source: `/${_from}/`,
            destination: `/${_to}/`,
            type: 301
        }))
    }
};


const outputPath = path.join(import.meta.dirname, "firebase.json");
fs.writeFileSync(outputPath, JSON.stringify(firebaseJson, null, 2));
console.info("[create-firebase-json] ✅ Done!");
