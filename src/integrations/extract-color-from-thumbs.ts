/* oxlint-disable no-magic-numbers */

import type { AstroIntegration } from "astro";
import type { HSLColor, RGBColor } from "@/types/common.js";
import type { ThumbColors } from "@/utils/thumb-loader.js";
import fs from "node:fs";
import path from "node:path";
import { getAverageColor } from "fast-average-color-node";

const INTEGRATION_NAME = "extract-color-from-thumbs";
const GENERATED_FOLDER_PATH = ".generated";
const SUPPORTED_DOMAINS = [
    "telefon-vergisi-hesaplayici",
    "konsol-vergisi-hesaplayici"
];

const processThumbsForDomain = async (domain: string): Promise<void> => {
    console.info(`[${INTEGRATION_NAME}] ⏳ Thumbs of "${domain}" are processing…`);
    const startTime = performance.now();

    // I need to separate `import.meta.glob` calls for each domain because it requires literal strings
    let thumbsPathBase64Pair: { [key: string]: string };

    if (domain === "telefon-vergisi-hesaplayici") {
        thumbsPathBase64Pair = import.meta.glob<string>("./../domains/telefon-vergisi-hesaplayici/thumb/*.png", {
            eager: true,
            import: "default",
            query: "?inline"
        });
    } else if (domain === "konsol-vergisi-hesaplayici") {
        thumbsPathBase64Pair = import.meta.glob<string>("./../domains/konsol-vergisi-hesaplayici/thumb/*.png", {
            eager: true,
            import: "default",
            query: "?inline"
        });
    } else {
        console.error(`[${INTEGRATION_NAME}] ⚠️ Unsupported domain: ${domain}`);
        return;
    }

    const results: ThumbColors = {};

    for await (const [filePath, base64] of Object.entries(thumbsPathBase64Pair)) {
        const fileName = getFileName(filePath);
        const { hsl } = await getDominantColor(base64 as string);
        results[fileName] = { hsl };
    }

    const generatedFolder = ensureFolderExists(GENERATED_FOLDER_PATH);

    fs.writeFileSync(
        path.join(generatedFolder, `${domain}-thumb-colors.json`),
        JSON.stringify(results),
        "utf8"
    );

    const endTime = performance.now();
    console.info(`[${INTEGRATION_NAME}] 🟩 Thumbs of "${domain}" are processed in ${(endTime - startTime).toFixed(2)} ms!`);
};

const getDominantColor = async (base64: string): Promise<{ hsl: HSLColor }> => {
    const averageColor = await getAverageColor(base64);
    return {
        hsl: rgbToHsl({
            r: averageColor.value[0],
            g: averageColor.value[1],
            b: averageColor.value[2]
        })
    };
};

const getFileName = (filePath: string): string => {
    return path.basename(filePath);
};

const ensureFolderExists = (folderPath: string): string => {
    const folder = path.resolve(folderPath);
    if (!fs.existsSync(folder)) {
        fs.mkdirSync(folder, { recursive: true });
    }
    return folder;
};

const rgbToHsl = ({ r, g, b }: RGBColor): HSLColor => {
    const normalizedR = r / 255;
    const normalizedG = g / 255;
    const normalizedB = b / 255;

    const max = Math.max(normalizedR, normalizedG, normalizedB);
    const min = Math.min(normalizedR, normalizedG, normalizedB);
    const delta = max - min;

    const lightness = (max + min) / 2;

    if (delta === 0) {
        return {
            h: 0,
            s: 0,
            l: Math.round(lightness * 100)
        };
    }

    const saturation = lightness > .5
        ? delta / (2 - max - min)
        : delta / (max + min);

    let hue = 0;
    switch (max) {
        case normalizedR:
            hue = ((normalizedG - normalizedB) / delta) + (normalizedG < normalizedB ? 6 : 0);
            break;
        case normalizedG:
            hue = ((normalizedB - normalizedR) / delta) + 2;
            break;
        default: // normalizedB
            hue = ((normalizedR - normalizedG) / delta) + 4;
            break;
    }

    return {
        h: Math.round(hue * 60),
        s: Math.round(saturation * 100),
        l: Math.round(lightness * 100)
    };
};


// oxlint-disable-next-line no-default-export
export default function extractColorFromThumbs(): AstroIntegration {
    return {
        name: INTEGRATION_NAME,
        hooks: {
            "astro:config:setup": async (): Promise<void> => {
                console.info(`[${INTEGRATION_NAME}] 🟡 Started`);
                const startTime = performance.now();

                for await (const domain of SUPPORTED_DOMAINS) {
                    await processThumbsForDomain(domain);
                }

                const endTime = performance.now();
                console.info(`[${INTEGRATION_NAME}] ✅ Done in ${(endTime - startTime).toFixed(2)} ms!`);
            }
        }
    };
};
