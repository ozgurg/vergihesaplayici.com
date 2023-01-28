// This file will generate a random string to use as a CSP nonce using the version of the package, the day of the current month and the current timestamp.
// This is against nonce logic, but at least each build will have different nonce. No problem for our static site.
// Check the "generate" script in package.json to see which step of the build we are using this file for.

const fs = require("fs");
const path = require("path");

const packageJson = require("./package.json");

const dayOfCurrentMonth = new Date().getDate();
const currentTimestamp = Date.now();
const versionNumber = parseInt(packageJson.version.replaceAll(".", ""));

const multiplication = versionNumber * currentTimestamp * dayOfCurrentMonth;
const cspNonce = multiplication.toString().split("").filter(letter => letter !== "0").reverse().join("");
const encoded = Buffer.from(cspNonce).toString("base64");

fs.writeFileSync(path.join(__dirname, "csp-nonce.txt"), encoded);

console.log("csp-nonce.txt created");
