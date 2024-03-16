// This file will generate a random string to use as a CSP nonce using the package version, the day of the current month, and the current timestamp.
// This goes against nonce logic, but at least each build will have a different nonce.
// There's no problem for our static site.
// Check the "generate" script in package.json to see which step of the build we are using this file for.

const fs = require("fs");
const path = require("path");

const { version } = require("./package.json");

const currentTimestamp = Date.now();
const versionNumber = parseInt(version.replace(/\D/g, ""), 10);
const multiplication = currentTimestamp * versionNumber;

const cspNonce = multiplication.toString().split("").filter(letter => letter !== "0").reverse().join("");
const encoded = Buffer.from(cspNonce).toString("base64");

const filePath = path.join(__dirname, "csp-nonce.txt");
fs.writeFileSync(filePath, encoded);

console.log(`${path.basename(filePath)} created`);
