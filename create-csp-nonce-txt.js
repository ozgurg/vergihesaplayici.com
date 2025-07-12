// Generates a pseudo-random CSP nonce using the package version, day of month, and timestamp.
// Not a true nonce, but ensures a unique value per build — fine for our static site.
// See the `build` script in `package.json` for where this is used.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import packageJson from "./package.json" with { type: "json" };

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const generateNonce = () => {
    const now = Date.now();
    const version = Number.parseInt(packageJson.version.replaceAll(".", ""), 10);
    const raw = (now * version).toString();
    const filtered = [...raw].filter(char => char !== "0").reverse().join("");
    return Buffer.from(filtered).toString("base64");
};

const writeNonceToFile = (nonce, filename) => {
    const fullPath = path.join(__dirname, filename);
    fs.writeFileSync(fullPath, nonce);
    console.info("[create-csp-nonce-txt] ✅ Done!");
};

writeNonceToFile(generateNonce(), "csp-nonce.txt");
